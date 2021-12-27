import Automerge from 'automerge';
import { serializeDoc } from "./automergeUtils.js";



class DBSavedCodeManager {
    constructor() {
        this.db = new Map();
        let temp = Automerge.init();
        temp = Automerge.change(temp, (doc) => {
            doc.text = new Automerge.Text();
        });
        this.set("doc1", serializeDoc(temp));
        this.set("doc2", serializeDoc(temp));
    }

    has(docId) {
        return this.db.has(docId);
    }

    get(docId) {
        return this.db.get(docId);
    }

    set(docId, doc) {
        this.db.set(docId, doc);
    }
}

export class DBManager {
    constructor() {
        this.dbSavedCodeManager = new DBSavedCodeManager();
    }

    validateUser(userId) {
        return true;
    }

    validateSession(sessionId) {
        return true;
    }
}