import styles from "../styles/sessions.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { addNewDocument, deleteDocument } from "../redux/slices/sessionSlice";
import Loading from "../components/Loading";
import Error404 from "./Error404";
import SessionList from "../components/SessionList.js";
import LeetcodeQuestionForm from "../components/LeetcodeQuestionForm.js";
import CustomQuestionForm from "../components/CustomQuestionForm.js";

const Session = () => {
	const [sessionName, setSessionName] = useState("");
	const [qtype, setQtype] = useState("");
	const [requestStatus, setRequestStatus] = useState("idle");
	// const user = useSelector((state) => state.user);
	const error = useSelector((state) => state.session.error);
	const sessionStatus = useSelector((state) => state.session.status);
	const session = useSelector((state) => state.session);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = (e) => {
		if (e.target.text === "Leetcode Question") setQtype("leetcode");
		else if (e.target.text === "Custom Question") setQtype("custom");
	};

	const handleDeleteDocument = async (documentId) => {
		console.log("deleting doc....", documentId);

		const canDelete = requestStatus === "idle";

		if (canDelete) {
			try {
				setRequestStatus("pending");

				const deletedSession = await dispatch(
					deleteDocument(documentId)
				).unwrap();

				console.log("IN session -> new document created", docRes);
				//use this id to navigate to desired page
				const URL = `/session/${id}/doc/${docRes.documentId}`;
				setRequestStatus("idle");
				navigate(URL);
			} catch (e) {
				console.log(e);

				window.alert("document not deleted try again");
			} finally {
				setRequestStatus("idle");
			}
		}
	};

	function getDocumentList(documents) {
		return documents.map((doc) => {
			return {
				id: doc.documentId,
				name: doc.title,
				link: `/session/${id}/doc/${doc.documentId}`,
				date: doc.createdAt,
			};
		});
	}

	return (
		<>
			<div className={styles.body}>
				<div className={styles.sessionName}>Session name: {sessionName}</div>
				<div className={styles.sessionContainer}>
					<SessionList
						title={"Documents History"}
						list={getDocumentList(session.documents)}
						handleDelete={handleDeleteDocument}
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
						<div>{qtype === "custom" && <CustomQuestionForm />}</div>
						<div>{qtype === "leetcode" && <LeetcodeQuestionForm />}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Session;
