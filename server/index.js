import { Server } from "socket.io";
import Automerge from "automerge";
import * as AMUtils from "./automergeUtils.js";

const AUTOMERGE_CHANGE = "AUTOMERGE_CHANGE";
const AUTOMERGE_INIT = "AUTOMERGE_INIT"


// load existing doc or create a new doc with empty text
let doc = Automerge.init();
doc = Automerge.change(doc, doc => {
    doc.text = new Automerge.Text();
});


const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log("usr connected");

    socket.on('disconnect', (reason) => {
        console.log("user disconnected: ", reason);
    });

    socket.on(AUTOMERGE_CHANGE, (seralizedArray) => {
        socket.broadcast.emit(AUTOMERGE_CHANGE, seralizedArray);
        const [newDoc, patch] = Automerge.applyChanges(doc, AMUtils.deserializeChanges(seralizedArray));
        doc = newDoc;
    })

    socket.emit(AUTOMERGE_INIT, AMUtils.serializeChanges(Automerge.getAllChanges(doc)));
});

