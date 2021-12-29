import styles from "../styles/sessions.module.css";

import { useSelector } from "react-redux";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error404 from "./Error404";
import SessionList from "../components/SessionList.js";
import LeetcodeQuestionForm from '../components/LeetcodeQuestionForm.js';
import CustomQuestionForm from '../components/CustomQuestionForm.js';

const Session = () => {
	const [sessionName, setSessionName] = useState("");
	const [qtype, setQtype] = useState("");
	// const user = useSelector((state) => state.user);
	const error = useSelector((state) => state.session.error);
	const sessionStatus = useSelector((state) => state.session.status);
  	const session = useSelector((state) => state.session);

	const { id } = useParams();

	// setDocs(docsData);

	//problem, must fetch everytime a page is loaded
	// useEffect(() => {
	// 	console.log("useEffect -> [Session]");

	// 	if (sessionStatus === "idle") {
	// 		console.log("fetching session data....");
	// 		dispatch(fetchSessionById(id));
	// 	}
	// }, [sessionStatus, dispatch]);

	// useEffect(() => {
	// 	console.log("useEffect -> [Session]");

	// 	// if (sessionStatus === "idle") {
	// 	console.log("fetching session data....");
	// 	dispatch(fetchSessionById(id));
	// 	// }
	// }, []);

	const handleClick = (e) => {
		if (e.target.text === "Leetcode Question") setQtype("leetcode");
		else if (e.target.text === "Custom Question") setQtype("custom");
	};

	if (sessionStatus === "loading") {
		console.log("loading");
		return <Loading />;
	} else if (sessionStatus === "failed") {
		console.log("error failed");
		return <Error404 />;
	} else if (sessionStatus === "succeeded") {
		return (
			<>
				<div className={styles.body}>
					<div className={styles.sessionName}>Session name: {sessionName}</div>
					<div className={styles.sessionContainer}>
						<SessionList
							sessions={session.documents}
							type={"doc"}
							title={"Documents History"}
						/>
						<div className={styles.form}>
							<Dropdown className="mb-5">
								<Dropdown.Toggle
									className={styles.formButton}
									id="dropdown-basic"
								>
									Create new doc
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={handleClick}>
										Leetcode Question
									</Dropdown.Item>
									<Dropdown.Item onClick={handleClick}>
										Custom Question
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<div>
								{qtype === "custom" && (
									<CustomQuestionForm/>
								)}
							</div>
							<div>
								{qtype === "leetcode" && (
									<LeetcodeQuestionForm/>
								)}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else { 
		return <h1>possible bug</h1>;
	}
};

export default Session;
