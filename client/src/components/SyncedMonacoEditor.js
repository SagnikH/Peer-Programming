import MonacoEditor from "./MonacoEditor.js"
import { useRef, useEffect } from 'react';
import Automerge from "automerge";
import * as AMUtils from "../utils/automergeUtils.js"

const AUTOMERGE_CHANGE = "AUTOMERGE_CHANGE";

// props: socket, doc, docid, 
export default function SyncedMonacoEditor(props) {
    const socketRef = useRef(props.socket);
    const docRef = useRef(props.doc);
    // const docidRef = useRef(props.docid);
    const editorRef = useRef(null);
    const toDisposeRef = useRef(null);  // to store Disposable reference for attached handler

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;

        // change things about editor here:
        // changing EOL of editor to LF as CR causes loopback issues during remote insert
        editor.getModel().setEOL(0);

        attachOnDidChangeContentHandler();
    }

    function setEditorValue(value) {
        // do not do anythng if editor not mounted
        if (!editorRef.current) return;

        // detaching OnDidChangeContent handler to avoid reccursive changes
        detachOnDidChangeContentHandler();

        editorRef.current.getModel().setValue(value);

        // reattach the OnDidChangeContent handler
        attachOnDidChangeContentHandler();
    }

    // add changes to crdt, emit changes
    function handleAndEmitUserChanges(event) {
        console.log(event);

        const newDoc = Automerge.change(docRef.current, doc => {
            for (let monacoChange of event.changes) {
                let text = monacoChange.text;
                let offset = monacoChange.rangeOffset;  // offset of changes
                let deleteCount = monacoChange.rangeLength;

                console.log("deleted " + deleteCount + " characters");
                // delete deleteCount characters starting from offSet!
                for (let i = 0; i < deleteCount; i++)
                    doc.text.deleteAt(offset)


                console.log("inserted " + text.length + " characters");
                // insert all characters from text starting at offset
                for (let i = 0; i < text.length; i++)
                    doc.text.insertAt(offset + i, text[i]);
            }
        });

        const changes = Automerge.getChanges(docRef.current, newDoc);
        docRef.current = newDoc;

        socketRef.current.emit(AUTOMERGE_CHANGE, AMUtils.serializeChanges(changes));
    }

    function applyRemoteChanges(serializedArray) {
        const [newDoc, patch] = Automerge.applyChanges(docRef.current, AMUtils.deserializeChanges(serializedArray));
        docRef.current = newDoc;

        // TODO: Use diffs to calculate new cursor position
        console.log(Object.values(patch.diffs.props.text));

        setEditorValue(docRef.current.text.toString());
    }

    function attachOnDidChangeContentHandler() {
        if (!editorRef.current) return;
        toDisposeRef.current = editorRef.current.getModel().onDidChangeContent(handleAndEmitUserChanges);
    }

    function detachOnDidChangeContentHandler() {
        if (!toDisposeRef.current) return;
        toDisposeRef.current.dispose();
        toDisposeRef.current = null;
    }

    useEffect(() => {
        socketRef.current.on(AUTOMERGE_CHANGE, applyRemoteChanges);
    });

    return (
        <div>
            <MonacoEditor value={docRef.current.text.toString()} onMount={handleEditorDidMount} />
        </div>
    );
}