import SyncedMonacoEditor from "./components/SyncedMonacoEditor"
import { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client"


function App() {
    const [isReady, setReady] = useState(false);
    const [docid, setDocid] = useState(0);

    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:3001');

        socketRef.current.on('connect', () => {
            console.log("Connected!");

            socketRef.current.on('disconnect', (reason) => {
                console.log("disconnected", reason);
                // TODO: clean up event listeners
                setReady(false);
            });

            setReady(true);
        });

    }, []);

    function increment() {
        console.log(docid)
        setDocid(docid + 1);
    }

    function decrement() {
        console.log(docid)
        setDocid(docid - 1);
    }


    if (isReady) {
        return (
            <div>
                <SyncedMonacoEditor socket={socketRef.current} docid={docid} />
                <button onClick={increment}>Increase</button>
                <button onClick={decrement}>Decrease</button>
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