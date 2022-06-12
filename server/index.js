const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
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

//error handler should be handled at the end
app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	else {
		res.status(500).json("An error occurred!");
	}
});

server.listen(PORT);
