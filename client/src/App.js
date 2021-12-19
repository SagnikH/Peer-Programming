import SyncedMonacoEditor from "./components/SyncedMonacoEditor"
import { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client"
import Automerge from "automerge";
import * as AMUtils from "./utils/automergeUtils.js"

// TODO: move init to SyncedMonacoEditor component
const AUTOMERGE_INIT = "AUTOMERGE_INIT"

function App() {
    const [isReady, setReady] = useState(false);

    const socketRef = useRef(null);
    const docRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:3001');

        socketRef.current.on('connect', () => {
            console.log("Connected!");

            socketRef.current.on('disconnect', (reason) => {
                console.log("disconnected", reason);
                // TODO: clean up event listeners
                setReady(false);
            });

            // TODO: move init to SyncedMonacoEditor component
            socketRef.current.on(AUTOMERGE_INIT, (seralizedArray) => {
                docRef.current = Automerge.init();
                const [newDoc] = Automerge.applyChanges(docRef.current, AMUtils.deserializeChanges(seralizedArray));
                docRef.current = newDoc;
                setReady(true);
            });
        });

    }, []);


    if (isReady) {
        return (
            <div>
                <SyncedMonacoEditor doc={docRef.current} socket={socketRef.current} />
            </div>
        );
    }
    else {
        return (
            <div>
                Initializing...
            </div>
        );
    }
}

export default App;