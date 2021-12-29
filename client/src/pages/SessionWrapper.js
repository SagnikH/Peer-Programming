import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/sessionWrapper.module.css";
import { fetchSessionById } from "../redux/slices/sessionSlice";
import { Outlet, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error404 from "./Error404";

export default function SessionWrapper() {
	const dispatch = useDispatch();
	const sessionStatus = useSelector((state) => state.session.status);

	const { id } = useParams();

	useEffect(() => {
		console.log("re-rendered");
		return () => {
			console.log("unmounted");
		};
	}, []);

	useEffect(() => {
		console.log("useEffect -> [Session]");

		console.log("fetching session data....");
		dispatch(fetchSessionById(id));
	}, []);


	if (sessionStatus === "loading") {
		console.log("loading");
		return <Loading />;
	} else if (sessionStatus === "failed") {
		console.log("error failed");
		return <Error404 />;
	} else if (sessionStatus === "succeeded") {
		return (
			<div className="d-flex">
				<div className={styles.main}>
					<Outlet />
				</div>
				<div className={styles.videocall}></div>
			</div>
		);
	} else {
		return <h1> Potential bug in Session</h1>;
	}
	
}
