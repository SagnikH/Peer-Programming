import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import styles from "../styles/sessionWrapper.module.css";
import { fetchSessionById } from "../redux/slices/sessionSlice";
import { Outlet, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error404 from "./Error404";
import { io } from "socket.io-client";
import { config } from "dotenv";
import { addSharedSession } from "../redux/slices/userSlice";
import VideoBar from "../components/VideoBar";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsFillPauseCircleFill } from "react-icons/bs";
config();

const URL = process.env.REACT_APP_SERVER_URL;
const SESSION_INIT = "session init";
const CLIENT_DISCONNECTED = "client disconnected";
const CLIENT_CONNECTED = "client connected";
const DOC_LIST_UPDATED = "doc list updated";

export default function SessionWrapper() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [allVideos, setAllVideos] = useState(1);
	const [cam, setCam] = useState(1);
	const [mic, setMic] = useState(1);

	const userId = useSelector((state) => state.user._id);
	// const sessionStatus = useSelector((state) => state.session.status);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [socket, setSocket] = useState(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		if (!userId || !id) {
			return () => {
				console.log("userId or id not set");
			};
		}

		console.log("New Session", id);
		console.log("userId", userId);
		const socket = io(URL, { auth: { userId, sessionId: id } });
		setSocket(socket);
		socket.onAny((event, ...args) => console.log(event, args));
		socket.on("connect", () => {
			console.log("Connected!");
			setConnected(true);
		});
		socket.on("disconnect", (reason) => {
			console.log("disconnected:", reason);
			setConnected(false);
		});

		socket.on(SESSION_INIT, (data) => {
			console.log("session init", data);
		});

		socket.on(DOC_LIST_UPDATED, () => {
			try {
				console.log("updating document list");
				docListUpdated();
			} catch (err) {
				console.log(err);
			}
		});

		return () => {
			console.log("session cleanup");
			if (socket) {
				if (socket.connected) socket.disconnect();
				socket.offAny(); // remove all event listeners
			}
			setConnected(false);
		};
	}, [userId]);

	useEffect(() => {
		(async() => {
			try {
				console.log("useEffect -> [Session]");
				console.log("fetching session data....");
				const session = await dispatch(fetchSessionById(id)).unwrap();

				//check if the session is created by the user
				dispatch(addSharedSession({ sessionId: id, userId: userId }));
				setLoading(false);
			} catch (e) {
				console.log(e);
				setError(true);
			}
		})();
	}, []);

	function docListUpdated() {
		// handle doc list update
		dispatch(fetchSessionById(id));
	}

	if (loading === "loading") {
		console.log("loading");
		return <Loading />;
	} else if (error) {
		console.log("error failed");
		return <Error404 />;
	} else if (!loading) {
		if (!connected) {
			console.log("not connected");
			return <Loading />;
		} else {
			return (
				<div className="d-flex" style={{ overflow: "hidden" }}>
					<div className={styles.main}>
						<Outlet context={socket} />
					</div>
					<div className={styles.videocall}>
						<div className={styles.videosSection}>
							<VideoBar
								socket={socket}
								roomId={id}
								toggleVideo={allVideos}
								toggleCam={cam}
								toggleMic={mic}
								userName={"ok"}
							/>
						</div>
						<div className="d-flex justify-content-around my-2 w-75 m-auto">
							<div
								className={styles.videoButton}
								onClick={() => setAllVideos(1 ^ allVideos)}
							>
								{allVideos ? (
									<BsFillPauseCircleFill size="1.5em" />
								) : (
									<BsFillPlayCircleFill size="1.5em" />
								)}
							</div>
							<div
								className={styles.videoButton}
								onClick={() => setCam(1 ^ cam)}
							>
								{cam ? (
									<BsFillCameraVideoFill size="1.5em" />
								) : (
									<BsFillCameraVideoOffFill size="1.5em" />
								)}
							</div>
							<div
								className={styles.videoButton}
								onClick={() => setMic(1 ^ mic)}
							>
								{mic ? (
									<BsFillMicFill size="1.5em" />
								) : (
									<BsFillMicMuteFill size="1.5em" />
								)}
							</div>
						</div>
					</div>
				</div>
			);
		}
	} else {
		return <h1> Potential bug in Session</h1>;
	}
}
