const Automerge = require('automerge');
const { deserializeChanges, deserializeDoc, serializeChanges, serializeDoc, getNewDoc } = require("./automergeUtils.js");

const SESSION_INIT = "session init"
const CLIENT_DISCONNECTED = "client disconnected";
const CLIENT_CONNECTED = "client connected";
const DOC_INIT = "doc init"
const DOC_CLOSED = "doc closed"
const CRDT_CHANGES = "crdt changes"
const CLIENT_OPENED_DOC = "client opened doc";
const CLIENT_CLOSED_DOC = "client closed doc";
const DOC_LIST_UPDATED = "doc list updated";

class AutomergeStore {
    #dbSavedCodeManager;
    #store;

    constructor(dbSavedCodeManager) {
        this.#dbSavedCodeManager = dbSavedCodeManager;
        this.#store = new Map();
    }

    async load(docId) {
        if (this.has(docId)) return;

        const serializeDoc = await this.#dbSavedCodeManager.get(docId);
        if (serializeDoc === null) {
            log(`document: ${docId} not found in DB`);
            return;
        }

        const doc = deserializeDoc(serializeDoc);
        this.#set(docId, doc);
    }

    has(docId) { return this.#store.has(docId); }

    get(docId) {
        if (this.has(docId))
            return this.#store.get(docId);
        return null;
    }

    #set(docId, doc) {
        this.#store.set(docId, doc);
    }

    #delete(docId) {
        this.#store.delete(docId);
    }

    async archive(docId) {
        if (this.has(docId)) {
            const doc = this.get(docId);
            this.#delete(docId);
            const text = doc.text.toString();
            await this.#dbSavedCodeManager.set(docId, serializeDoc(getNewDoc(text)));
        }
    }

    // return changes or null
    getAllChanges(docId) {
        if (!this.has(docId)) return null;
        return serializeChanges(Automerge.getAllChanges(this.get(docId)));
    }

    applyChanges(docId, changes) {
        if (!this.has(docId)) return false;
        const [newDoc] = Automerge.applyChanges(this.get(docId), deserializeChanges(changes));
        this.#set(docId, newDoc);
        return true;
    }

    log(...data) {
        console.log("[Automerge Store]", data);
    }
}


function SessionManager(io, dbManager) {
    console.log("setting up session manager");
    const automergeStore = new AutomergeStore(dbManager.dbSavedCodeManager);
    function log(...data) { console.log("[Session Manager]", data); }

    async function docInit(socket, docId) {
        if (!automergeStore.has(docId)) await automergeStore.load(docId);
        const changes = automergeStore.getAllChanges(docId);
        const response = {
            docId,
            changes,
        }
        if (changes === null) {
            response.ok = false;
            response.message = "no such document";
            log(`DOC_INIT FAILED on doc ${docId} by user ${userId}`);
        } else {
            response.ok = true;
            socket.docId = docId;
            socket.to(socket.sessionId).emit(CLIENT_OPENED_DOC, { clientId: socket.id, docId });
            socket.join(docId);
        }

        return response;
    }

    async function docClosed(socket, docId) {
        socket.docId = null;
        await socket.leave(docId);
        const sockets = await io.in(docId).allSockets();
        if (sockets.size === 0) {
            console.log("Archived: ", docId);
            await automergeStore.archive(docId);
        } else {
            socket.to(socket.sessionId).emit(CLIENT_CLOSED_DOC, { clientId: socket.id, docId });
        }
    }

    function crdtChanges(socket, docId, changes) {
        const response = { docId };
        if (automergeStore.applyChanges(docId, changes)) {
            response.ok = true;

            socket.to(docId).emit(CRDT_CHANGES, { docId, changes });
        } else {
            response.ok = false;
            response.message = "no such document";
            log(`CRDT_CHANGES FAILED for doc: ${docId} by user ${userId}`)
        }
        return response;
    }

    io.use(async (socket, next) => {
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
        log(`${socket.userId} connected | session: ${socket.sessionId}`);

        socket.on('disconnect', async (reason) => {
            log(`${socket.userId} disconnected | session: ${socket.sessionId}`, reason);
            if (socket.docId) await docClosed(socket, socket.docId);
            socket.to(socket.sessionId).emit(CLIENT_DISCONNECTED, { clientId: socket.id });
        });

        socket.on(DOC_INIT, async ({ docId }, callback) => {
            callback(await docInit(socket, docId));
        });

        socket.on(CRDT_CHANGES, ({ docId, changes }, callback) => {
            callback(crdtChanges(socket, docId, changes));
        });

        socket.on(DOC_CLOSED, async ({ docId }) => {
            await docClosed(socket, docId);
        })

        socket.on(DOC_LIST_UPDATED, () => {
            socket.to(socket.sessionId).emit(DOC_LIST_UPDATED);
        });

        socket.join(socket.sessionId);
        socket.to(socket.sessionId).emit(CLIENT_CONNECTED, { clientId: socket.id });
        socket.emit(SESSION_INIT, { ok: true });


        // Code from Ronak for video calling
        socket.on('join-room', (roomId, userId, userName) => {
            console.log('join', roomId, userId);


            socket.join(roomId)
            socket.to(roomId).emit('user-connected', { userId, userName })

            socket.on('disconnect', () => {
                socket.to(roomId).emit('user-disconnected', userId)
                console.log("user disconnected");

            })
            socket.on('video-disconnected', (userId) => {
                socket.to(roomId).emit('user-disconnected', userId)
                console.log("user disconnected");

            })
        })
    });


    function notifyDocListUpdated(sessionId) {
        io.to(sessionId).emit(DOC_LIST_UPDATED);
    }

    return [notifyDocListUpdated];

}

module.exports = SessionManager;