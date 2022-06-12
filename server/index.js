const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const { DatabaseError, UserFacingError } = require("./utils/errors/baseErrors");
const { verifyJWT } = require("./middlewares/authMiddleware");
const { DBManager } = require("./utils/DBManager");
const SessionManager = require("./utils/SessionManager");
require("dotenv").config();

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

(async () => {
	try {
		await mongoose.connect(URI);
		console.log("Connected to db");
	} catch (e) {
		// TODO: handle connection failure 
		console.error("Error in connecting to db", e);
	}
})();

// TODO: https in deployment
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
	cors: {
		origin: [process.env.CLIENT_URL],
		methods: ["GET", "POST"],
	},
});

SessionManager(io, new DBManager());

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: process.env.CLIENT_URL, 
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true, 		// for authentication
	})
);

app.use("/auth", authRoutes);
app.use("/api", verifyJWT, apiRoutes);

app.get("/", (req, res) => {
	res.send("Dummy response");
});


// TODO: understand this mess: 
//error handler should be handled at the end
app.use((err, req, res, next) => {
	// console.log("error handler", err);
	if (res.headersSent) {
		return next(err);
	}
	if (err instanceof DatabaseError) {
		res.status(err.statusCode).json(err.message);
	} else if (err instanceof UserFacingError) {
		res.status(err.statusCode).json(err.message);
	} else {
		res.status(500).json(err.message);
	}
});

server.listen(PORT);
