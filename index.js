const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const { DatabaseError, UserFacingError } = require("./utils/errors/baseErrors");
require("dotenv").config();

const { DBManager } = require("./utils/DBManager");
const SessionManager = require("./utils/SessionManager");

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

(async () => {
	try {
		const connection = await mongoose.connect(URI);

		//console.log("connected to db");
	} catch (e) {
		//console.log(e);
	}
})();

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
		origin: process.env.CLIENT_URL, // "http://localhost:3000"
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true, // allow session cookie from browser to pass through
	})
);

app.use("/auth", authRoutes);
//TODO: checkUser middleware implement later
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
	res.send("homepage");
});

//error handler should be handled at the end
app.use((err, req, res, next) => {
	// //console.log("error handler", err);
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

// replacing
// app.listen(PORT, () => {
// 	//console.log("connected to port 4000");
// });
// by server.listen to allow socket.io to listen on same port
server.listen(PORT);
