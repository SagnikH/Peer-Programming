import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/sessionWrapper.module.css";
import { fetchSessionById, addNewDocument } from "../redux/slices/sessionSlice";
import { Outlet, useParams } from "react-router-dom";
import { io } from "socket.io-client"
import Loading from "../components/Loading";

const URL = "http://localhost:3001";
const SESSION_INIT = "session init"
const CLIENT_DISCONNECTED = "client disconnected";
const CLIENT_CONNECTED = "client connected";

export default function SessionWrapper() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const userId = useSelector((state) => state.user._id);
	const [socket, setSocket] = useState(null);
	const [connected, setConnected] = useState(false);


	useEffect(() => {
		console.log("New Session", id);
		console.log("userId",  userId)
		const socket = io(URL, { auth: { userId, sessionId:id } });
		setSocket(socket);
		socket.onAny((event, ...args) => console.log(event, args));
		socket.on("connect", () => {
			console.log("Connected!")
			setConnected(true);
		});
		socket.on("disconnect", (reason) => {
			console.log("disconnected:", reason);
			setConnected(false);
		});

		socket.on(SESSION_INIT, (data) => {
			console.log("session init", data);
		});


		return () => {
			console.log("session cleanup");
			if (socket) {
				if (socket.connected) socket.disconnect();
				socket.offAny();    // remove all event listeners
			}
			setConnected(false);
		};
	}, []);


	useEffect(() => {
		console.log("useEffect -> [Session]");
		// if (sessionStatus === "idle") {
		console.log("fetching session data....");
		dispatch(fetchSessionById(id));
		// }
	}, []);


	if (connected)
		return (
			<div className="d-flex">
				<div className={styles.main}>
					<Outlet />
				</div>
				<div className={styles.videocall}></div>
			</div>
		);
	else
		return <Loading />;
}
