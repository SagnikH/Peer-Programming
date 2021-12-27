import { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client"
import SessionHome from "./SessionHome";
import Peers from "./Peers";
import Document from "./Document";
import Loading from './Loading';

const URL = "http://localhost:3001";
const SESSION_INIT = "session init"
const CLIENT_DISCONNECTED = "client disconnected";
const CLIENT_CONNECTED = "client connected";

export default function Session({ sessionId, userId }) {
    const [socket, setSocket] = useState(null);
    const [docList, setDocList] = useState(null);
    const [doc, setDoc] = useState(null);
    const [peers, setPeers] = useState([]);
    const peersRef = useRef(peers);

    useEffect(() => {
        peersRef.current = peers;
    }, [peers])

    useEffect(() => {
        console.log(doc);
    }, [doc]);

    useEffect(() => {
        console.log("Session", sessionId, userId);
        const socket = io(URL, { auth: { userId, sessionId } });

        setSocket(socket);

        socket.onAny((event, ...args) => console.log(event, args));

        socket.on("connect", () => console.log("Connected!"));

        socket.on("disconnect", (reason) => {
            setDoc(null);
            setDocList(null);
            console.log("disconnected:", reason);
        });

        socket.on(SESSION_INIT, (data) => {
            if (data.ok) {
                setDocList(data.docs);
                setPeers(data.peers);
            } else {
                console.log("session:init failed", data);
            }
        });

        socket.on(CLIENT_CONNECTED, ({ clientId }) => {
            setPeers(peersRef.current.concat([clientId]));
        });

        socket.on(CLIENT_DISCONNECTED, ({ clientId }) => {
            setPeers(peersRef.current.filter(id => id !== clientId));
        });

        // cleanup
        return () => {
            console.log("session cleanup");
            if (socket) {
                if (socket.connected) socket.disconnect();
                socket.offAny();    // remove all event listeners
            }
        }
    }, [sessionId, userId]);

    if (docList === null) {
        return <Loading />
    }
    else if (doc === null) {
        return (
            <div>
                <Peers peers={peers} />
                <SessionHome docList={docList} setDoc={setDoc}/>
            </div>
        );
    }
    else {
        return (
            <div>
                <button onClick={() => setDoc(null)}>Home</button>
                <Peers peers={peers} />
                <Document docId={doc} socket={socket} />
            </div>
        );
    }
};