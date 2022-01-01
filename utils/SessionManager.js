const Automerge = require('automerge');
const { deserializeChanges, deserializeDoc, serializeChanges, serializeDoc } = require("./automergeUtils.js");

const SESSION_INIT = "session init"
const CLIENT_DISCONNECTED = "client disconnected";
const CLIENT_CONNECTED = "client connected";
const DOC_INIT = "doc init"
const DOC_CLOSED = "doc closed"
const CRDT_CHANGES = "crdt changes"
const CLIENT_OPENED_DOC = "client opened doc";
const CLIENT_CLOSED_DOC = "client closed doc";

class AutomergeStore {
    #dbSavedCodeManager;
    #store;

    constructor(dbSavedCodeManager) {
        this.#dbSavedCodeManager = dbSavedCodeManager;
        this.#store = new Map();
    }

    async get(docId) {
        if (this.#store.has(docId))
            return this.#store.get(docId);
        if (await this.#dbSavedCodeManager.has(docId)) {
            const doc = deserializeDoc(await this.#dbSavedCodeManager.get(docId));
            this.#store.set(docId, doc);
            return doc;
        }
        return null;
    }

    #set(docId, doc) {
        this.#store.set(docId, doc);
    }

    async archive(docId) {
        if (this.#store.has(docId)) {
            await this.#dbSavedCodeManager.set(docId, serializeDoc(this.#store.get(docId)));
            this.#store.delete(docId);
        }
    }

    inStore(docId) {
        return this.#store.has(docId);
    }

    async getAllChanges(docId) {
        const doc = await this.get(docId);
        if (doc === null) return null;
        return serializeChanges(Automerge.getAllChanges(doc));
    }

    async applyChanges(docId, changes) {
        const doc = await this.get(docId);
        if (doc === null) return false;
        const [newDoc] = Automerge.applyChanges(doc, deserializeChanges(changes));
        this.#set(docId, newDoc);
        return true;
    }
}


function SessionManager(io, dbManager) {
    console.log("setting up session manager");
    const automergeStore = new AutomergeStore(dbManager.dbSavedCodeManager);

    function logClient(socket) {
        console.log("--userId:", socket.userId);
        console.log("--sessionId:", socket.sessionId);
    }

    async function docInit(socket, docId) {
        const changes = await automergeStore.getAllChanges(docId);
        const response = { ok: (changes !== null), changes };
        if (changes === null) {
            socket.docId = null;
            response.message = "no such document";
        } else {
            socket.docId = docId;
            socket.join(docId);
            socket.to(socket.sessionId).emit(CLIENT_OPENED_DOC, { clientId: socket.id, docId });
        }
        return response;
    }

    async function docClosed(socket, docId) {
        await socket.leave(docId);
        socket.docId = null;
        const sockets = await io.in(docId).allSockets();
        if (sockets.size === 0) {
            console.log("Archived:", docId);
            await automergeStore.archive(docId);
        } else {
            socket.to(socket.sessionId).emit(CLIENT_CLOSED_DOC, { clientId: socket.id, docId });
        }
    }

    async function crdtChanges(socket, docId, changes) {
        const response = { docId };
        if (await automergeStore.applyChanges(docId, changes)) {
            socket.to(docId).emit(CRDT_CHANGES, { docId, changes });
            response.ok = true;
        } else {
            response.ok = false;
            response.message = "no such document";
        }
        return response;
    }

    async function getPeers(sessionId) {
        const peers = [];
        const sockets = await io.in(sessionId).allSockets();
        for (const s of sockets) {
            peers.push(s);
        }
        return peers;
    }


    io.use( async (socket, next) => {
        const userId = socket.handshake.auth.userId;
        const sessionId = socket.handshake.auth.sessionId;

        if (!(await dbManager.validateUserId(userId)))
            return next(new Error("invalid userid"));
        if (!(await dbManager.validateSessionId(sessionId)))
            return next(new Error("invalid session"));

        socket.userId = userId;
        socket.sessionId = sessionId;
        next();
    });


    io.on('connection', async (socket) => {
        console.log("client connected:", socket.userId, socket.sessionId);

        socket.on('disconnect', async (reason) => {
            console.log("client disconnected:", socket.userId, socket.sessionId);
            if (socket.docId) await docClosed(socket, socket.docId);
            socket.to(socket.sessionId).emit(CLIENT_DISCONNECTED, { clientId: socket.id });
        });

        socket.on(DOC_INIT, async ({ docId }, callback) => {
            callback(await docInit(socket, docId));
        });

        socket.on(CRDT_CHANGES, async ({ docId, changes }, callback) => {
            callback( await crdtChanges(socket, docId, changes));
        });

        socket.on(DOC_CLOSED, async ({ docId }) => {
            await docClosed(socket, docId);
        })

        socket.join(socket.sessionId);
        socket.to(socket.sessionId).emit(CLIENT_CONNECTED, { clientId: socket.id });
        const peers = await getPeers(socket.sessionId);
        socket.emit(SESSION_INIT, { ok: true, docs: ["doc2", "doc1"], peers });
        // use socket.userId and socket.sessionId for call
    });

}

module.exports = SessionManager;