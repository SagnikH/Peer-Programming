import { Server } from "socket.io";
import Automerge, { decodeChange } from "automerge";
import * as AMUtils from "./automergeUtils.js";

const AUTOMERGE_CHANGE = "AUTOMERGE_CHANGE";
const AUTOMERGE_INIT = "AUTOMERGE_INIT";
const AUTOMERGE_CLEANUP = "AUTOMERGE_CLEANUP";

const db = new Map();
const docStore = new Map();

let temp = Automerge.init();
temp = Automerge.change(temp, (doc) => {
    doc.text = new Automerge.Text();
});
addSavedStateToDB(0, Automerge.save(temp));
addSavedStateToDB(2, Automerge.save(temp));

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});

io.of("/").adapter.on("create-room", (room) => {
    console.log("room created!", room);
});

io.of("/").adapter.on("delete-room", (room) => {
    console.log("deleted room", room);
    // trigger archiveDoc if room is a docid room
});


io.on('connection', (socket) => {
    console.log("usr connected");

    socket.on('disconnect', (reason) => {
        console.log("user disconnected: ", reason);
    });


    socket.on(AUTOMERGE_CHANGE, (data, callback) => {
        const doc = getDoc(data.docid);
        let response = {
            docid: data.docid
        };
        if (doc === null) {
            response.ok = false;
            response.message = "no such document!";
        } else {
            socket.to(data.docid).emit(AUTOMERGE_CHANGE, data);
            const [newDoc] = Automerge.applyChanges(doc, AMUtils.deserializeChanges(data.changes));
            docStore.set(data.docid, newDoc);
            response.ok = true;
        }
        callback(response);
    })


    socket.on(AUTOMERGE_INIT, (data, callback) => {
        let doc = getDoc(data.docid);
        let response = {
            docid: data.docid
        };
        if (doc === null) {
            response.changes = null;
            response.ok = false;
            response.message = "no such document!";
        } else {
            response.changes = AMUtils.serializeChanges(Automerge.getAllChanges(doc));
            response.ok = true;

            // add to room: 
            socket.join(data.docid);
        }
        callback(response);
    });

    // add disconnecting for cleanup when user disconnects without emitting AUTOMERGE_CLEANUP

    socket.on(AUTOMERGE_CLEANUP, (data) => {
        if (socket.leave(data.docid));
        console.log(AUTOMERGE_CLEANUP, data);

        if (io.sockets.adapter.rooms[data.docid].length === 0) {
            console.log("archiving", docid);
            archiveDoc(docid);
        }
    });
});


// Document Store:


function getDoc(docid) {
    if (docStore.has(docid))
        return docStore.get(docid);
    else if (db.has(docid)) {
        let savedState = getSavedStateFromDB(docid);
        let doc = Automerge.load(savedState);
        docStore.set(docid, doc);
        return doc;
    } else return null;
}

function archiveDoc(docid) {
    if (!docStore.has(docid)) return;
    let doc = docStore.get(docid);
    docStore.delete(docid);
    addSavedStateToDB(docid, Automerge.save(doc));
}


// Simulating Database:

function getSavedStateFromDB(docid) {
    if (db.has(docid)) {
        return db.get(docid);
    } else {
        return null;
    }
}

function addSavedStateToDB(docid, state) {
    db.set(docid, state);
}