import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	createSession,
	deleteSession,
	deleteSharedSession,
} from "../redux/slices/userSlice";
import { Button } from "react-bootstrap";
import WarningModal from "../components/WarningModal";
import UserInfo from "../components/UserInfo.js";
import JoinForm from "../components/JoinForm.js";
import Loading from "../components/Loading.js";
import styles from "../styles/dashboard.module.css";
import SessionList from "../components/SessionList.js";
import { config } from "dotenv";
config();

const Dashboard = () => {
	const dispatch = useDispatch();
	const [requestStatus, setRequestStatus] = useState("idle");
	const [showModal, setShowModal] = useState(false);

	const user = useSelector((state) => state.user);
	const userStatus = useSelector((state) => state.user.status);

	const logoutHandler = (e) => {
		window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/logout`;
	};

	//push inside a utility funciton
	const handleDeleteSession = async (sessionId) => {
		console.log("deleting session....", sessionId);

		const canDelete = requestStatus === "idle";

		if (canDelete) {
			try {
				setRequestStatus("pending");

				const deletedSession = await dispatch(
					deleteSession(sessionId)
				).unwrap();

				console.log("IN dashboard -> session deleted", deletedSession);
			} catch (e) {
				console.log(e);

				window.alert("document not deleted try again");
			} finally {
				setRequestStatus("idle");
			}
		}
	};

	const handleDeleteSharedSession = async (sessionId) => {
		console.log("deleting shared session....", sessionId);

		const canDelete = requestStatus === "idle";

		if (canDelete) {
			try {
				setRequestStatus("pending");

				const deletedSession = await dispatch(
					deleteSharedSession({sessionId, userId: user._id})
				).unwrap();

				console.log("IN dashboard -> shared session deleted", deletedSession);
			} catch (e) {
				console.log(e);

				window.alert("document not deleted try again");
			} finally {
				setRequestStatus("idle");
			}
		}
	};

	function getUserSessionsList(sessions) {
		return sessions.map((session) => {
			return {
				id: session.sessionId,
				name: session.name,
				link: `/session/${session.sessionId}`,
				date: session.createdAt,
			};
		});
	}

	if (userStatus === "loading") {
		return <Loading />;
	}
	//TODO: handle in case of error on fetching user for dashboard -> need logout button
	//maybe implicitly open modal
	// else if(userStatus === "rejected"){
	//   return <Error404 />;
	// }
	else if (userStatus === "succeeded") {
		return (
			<>
				<WarningModal
					showModal={showModal}
					setShowModal={setShowModal}
					handlePositive={logoutHandler}
					message={"Are you sure you want to log out?"}
					id={""}
				/>
				<div className={styles.dashboard}>
					<UserInfo />
					<SessionList
						title={"Created Sessions"}
						list={getUserSessionsList(user.userSessions)}
						handleDelete={handleDeleteSession}
					/>
					<SessionList
						title={"Shared Sessions"}
						list={getUserSessionsList(user.sharedSessions)}
						handleDelete={handleDeleteSharedSession}
					/>
				</div>
				<div className={styles.buttons}>
					<JoinForm />

					<div className={styles.logoutButton}>
						<Button variant="danger" onClick={() => setShowModal(true)}>
							Log Out
						</Button>
					</div>
				</div>
			</>
		);
	} else {
		return <h1>Potenial bug</h1>;
	}
};

export default Dashboard;
