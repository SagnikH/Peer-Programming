import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/sessionWrapper.module.css";
import { fetchSessionById, addNewDocument } from "../redux/slices/sessionSlice";
import { Outlet, useParams } from "react-router-dom";

export default function SessionWrapper() {
	const dispatch = useDispatch();

	const { id } = useParams();

	useEffect(() => {
		console.log("re-rendered");
		return () => {
			console.log("unmounted");
		};
	}, []);

	useEffect(() => {
		console.log("useEffect -> [Session]");

		// if (sessionStatus === "idle") {
		console.log("fetching session data....");
		dispatch(fetchSessionById(id));
		// }
	}, []);

	return (
		<div className="d-flex">
			<div className={styles.main}>
				<Outlet />
			</div>
			<div className={styles.videocall}></div>
		</div>
	);
}
