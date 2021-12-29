import MonacoEditor from "./MonacoEditor.js"
import { useRef, useEffect, useState } from 'react';
import Automerge from "automerge";
import * as AMUtils from "../utils/automergeUtils.js"

const DOC_INIT = "doc init"
const DOC_CLOSED = "doc closed"
const CRDT_CHANGES = "crdt changes"

export default function SyncedMonacoEditor({socket, docId}) {
    const [isReady, setIsReady] = useState(null);
    const docRef = useRef(null);
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const toDisposeRef = useRef(null);  // to store Disposable reference for attached handler

    useEffect(() => {
        console.log("SyncedMonacoEditor:useEffect");


        socket.on(CRDT_CHANGES, (data) => {
            if (data.docId === docId) {
                console.log("change:Applying remote changes");
                applyRemoteChanges((data.changes));
            }
            else {
                console.log("change:wrong docId", data);
                setIsReady(false);
            }
        });

        socket.emit(DOC_INIT, { docId }, (response) => {
            if (response.ok) {
                docRef.current = Automerge.init();
                const [newDoc] = Automerge.applyChanges(docRef.current, AMUtils.deserializeChanges(response.changes));
                docRef.current = newDoc;
                setIsReady(true);
            } else {
                setIsReady(false);
            }
            console.log(DOC_INIT, docId, response);
        });



        return () => {
            console.log("SyncedMonacoEditor:~useEffect", docId);
            if (socket) {
                socket.off(CRDT_CHANGES);
                if (socket.connected && docId)
                    socket.emit(DOC_CLOSED, { docId: docId });
            }
            setIsReady(null);
        }
    }, [socket, docId]);


    useEffect(() => {
        if (socket && docId && isReady === false) {
            console.log("SyncedMonacoEditor:socketCleanUp", docId);
            socket.off(CRDT_CHANGES);
            if (socket.connected)
                socket.emit(DOC_CLOSED, { docId: docId });
        }
    }, [isReady]);



    // ---------- SOCKET UTIL FUNCTIONC ----------

    function emitChanges(allChanges) {
        for (let i = 0; i < allChanges.length; i++) {
            const data = {
                docId: docId, changes: allChanges[i]
            };
            socket.emit(CRDT_CHANGES, data, (response) => {
                if (!response.ok) {
                    console.log("emitchange: response not ok", data, response);
                    setIsReady(false);
                }
            });
        }
    }

    // ---------- ---------- ----------

    // ---------- SOCKET/MONACO UTIL FUNCTIONC ----------

    // add changes to Automerge, emit using socket
    function handleAndEmitUserChanges(event) {
        const allChanges = [];
        for (let monacoChange of event.changes) {
            let text = monacoChange.text;
            let offset = monacoChange.rangeOffset;
            let deleteCount = monacoChange.rangeLength;

            if (deleteCount > 0) {
                const newDoc = Automerge.change(docRef.current, doc => {
                    // delete deleteCount characters starting from offSet!
                    for (let i = 0; i < deleteCount; i++)
                        doc.text.deleteAt(offset)
                });
                const changes = Automerge.getChanges(docRef.current, newDoc);
                docRef.current = newDoc;
                allChanges.push(AMUtils.serializeChanges(changes));
            }

            if (text.length > 0) {
                const newDoc = Automerge.change(docRef.current, doc => {
                    // insert all characters from text starting at offset
                    for (let i = 0; i < text.length; i++)
                        doc.text.insertAt(offset + i, text[i]);
                });
                const changes = Automerge.getChanges(docRef.current, newDoc);
                docRef.current = newDoc;
                allChanges.push(AMUtils.serializeChanges(changes));
            }

        }

        emitChanges(allChanges);

    }

    // apply remote changes to local Automerge doc and editor
    function applyRemoteChanges(serializedArray) {
        const text = docRef.current.text.toString();

        const [newDoc, patch] = Automerge.applyChanges(docRef.current, AMUtils.deserializeChanges(serializedArray));
        docRef.current = newDoc;

        // no need to apply changes to editor if not mounted yet or if no difference
        if (!editorRef.current || !patch.diffs.props.text) return;

        // get the edits of the patch
        const edits = Object.values(patch.diffs.props.text)[0].edits;

        // convert Automerge edit to executable Monaco edit
        const editToExecute = calculateEdits(edits, text);

        // ensure edit is "valid"
        if (editToExecute === null) {
            console.log("executable edit null", "edits:", edits, "text:", text);
            return;
        }

        // detaching OnDidChangeContent handler to avoid reccursive changes
        detachOnDidChangeContentHandler();

        editorRef.current.executeEdits("remote-edit", [editToExecute]);

        // reattach the OnDidChangeContent handler
        attachOnDidChangeContentHandler();
    }

    // ---------- ---------- ----------


    // ---------- MONACO UTIL FUNCTIONS ----------

    // get the reference to editor, attach the event listener
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // change things about editor here:
        // changing EOL of editor to LF as CR causes loopback issues during remote insert
        editor.getModel().setEOL(0);

        attachOnDidChangeContentHandler();
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


    // sets value of the editor
    // side effect: reloads almost entire editor state
    //              specifically cursors and selections reset!
    // function setEditorValue(value) {
    //     // do not do anythng if editor not mounted
    //     if (!editorRef.current) return;

    //     // detach handler to prevent reccursive calling of
    //     // onDidChangeContent Handler 
    //     detachOnDidChangeContentHandler();
    //     editorRef.current.getModel().setValue(value);
    //     // reattach the onDidChangeContent handler
    //     attachOnDidChangeContentHandler();
    // }

    // ---------- ---------- ---------- ---------- 

    // ---------- AUTOMERGE/MONACO UTIL FUNCTIONS ----------

    // converts edits from patch of Automerge to
    // edits to be executed on Monaco editor
    // edits: should contain a single edit - remove/insert/multi-insert
    // text:  text before applying this edit
    function calculateEdits(edits, text) {
        if (edits === null || edits === undefined) return null;
        if (text === null || text === undefined) return null;

        if (edits.length > 1) {
            console.log("LENGTH > 1", edits);
        }

        let range, toInsert = "";
        const edit = edits[0];

        if (edit.action === "remove") {
            range = getRangeOfEditforRemove(edit.index, edit.count, text);
        } else if (edit.action === "insert") {
            range = getRangeForInsert(edit.index, text);
            toInsert = edit.value.value;
        } else if (edit.action === "multi-insert") {
            range = getRangeForInsert(edit.index, text);
            toInsert = edit.values.join('');
        } else {
            console.log("ACTION NOT HANDLED", edits, edit, edit.action);
        }
        return { range, text: toInsert };
    }

    // index:   index of insertion
    // text:    text before inserting
    // returns: range at which new text was inserted
    function getRangeForInsert(index, text) {
        let line = 1, col = 1;
        let i;
        for (i = 0; i < index; i++) {
            if (text[i] === '\n') {
                line++;
                col = 1;
            } else {
                col++;
            }
        }
        const startLine = line;
        const startColumn = col;
        const endLine = line;
        const endColumn = col;
        return new monacoRef.current.Range(startLine, startColumn, endLine, endColumn);
    }

    // index:   index of deletion
    // count:   count of characters deleted
    // text:    text before deleting
    // returns: range that was deleted
    function getRangeOfEditforRemove(index, count, text) {
        let line = 1, col = 1;
        let i;
        for (i = 0; i < index; i++) {
            if (text[i] === '\n') {
                line++;
                col = 1;
            } else {
                col++;
            }
        }
        const startLine = line;
        const startColumn = col;
        for (i = 0; i < count; i++) {
            if (text[i + index] === '\n') {
                line++;
                col = 1;
            } else {
                col++;
            }
        }
        const endLine = line;
        const endColumn = col;
        return new monacoRef.current.Range(startLine, startColumn, endLine, endColumn);
    }

    // ---------- ---------- ---------- ---------- 

    if (isReady) {
        return (
            <div>
                <MonacoEditor value={docRef.current.text.toString()} onMount={handleEditorDidMount} />
            </div>
        );
    } else {
        return (
            <div>Editor not ready...</div>
        );
    }

}