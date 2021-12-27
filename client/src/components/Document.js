import SyncedMonacoEditor from "./SyncedMonacoEditor";
import { useState, useEffect } from "react";

export default function Document(props) {
    const [docId] = useState(props.docId);
    const [socket] = useState(props.socket);

    useEffect(() => {
        console.log("Document", docId);
    }, [docId])

    return (
        <div>
            <h3>{docId}</h3>
            <SyncedMonacoEditor socket={socket} docId={docId} />
        </div>
    );
}