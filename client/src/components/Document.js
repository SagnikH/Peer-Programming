import SyncedMonacoEditor from "./SyncedMonacoEditor";

export default function Document({socket, docId}) {

    return (
        <div>
            <h3>{docId}</h3>
            <SyncedMonacoEditor socket={socket} docId={docId} />
        </div>
    );
}