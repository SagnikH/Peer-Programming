import { Server } from "socket.io";
import { DBManager } from "./DBUtils.js";
import SessionManager from "./SessionManager.js";

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});



const dbManager = new DBManager();

SessionManager(io, dbManager);
