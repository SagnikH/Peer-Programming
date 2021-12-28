import styles from "../styles/sessions.module.css";
import docsData from "../assets/docsData.json";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchSessionById, addNewDocument } from "../redux/slices/sessionSlice";
import Loading from "../components/Loading";
import Error404 from "./Error404";
import sessions from "../assets/sessions.json";
import SessionList from "../components/SessionList.js";

const Session = () => {
	const [sessionName, setSessionName] = useState("");
	const [docs, setDocs] = useState([]);
	const [docTitle, setDocTitle] = useState("");
	const [docQuestionText, setDocQuestionText] = useState("");
	const [qtype, setQtype] = useState("");
	const [qlink, setQLink] = useState("");
	const [requestStatus, setRequestStatus] = useState("idle");
	// const user = useSelector((state) => state.user);
	const error = useSelector((state) => state.session.error);
	const sessionStatus = useSelector((state) => state.session.status);
  const session = useSelector((state) => state.session);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	useEffect(() => {
		console.log("useEffect -> [Session]");

		// if (sessionStatus === "idle") {
		console.log("fetching session data....");
		dispatch(fetchSessionById(id));
		// }
	}, []);

	const handleClick = (e) => {
		if (e.target.text === "Leetcode Question") setQtype("leetcode");
		else if (e.target.text === "Custom Question") setQtype("custom");
	};

	const handleTitleChange = (e) => {
		setDocTitle(e.target.value);
	};

	const handleTextAreaChange = (e) => {
		setDocQuestionText(e.target.value);
	};

	const handleCreateDoc = async (e) => {
		console.log("creating doc......");
		e.preventDefault();

		let canSave = requestStatus === "idle" && qtype;

		if (qtype === "custom") {
			canSave = canSave && docTitle && docQuestionText;
		} else if (qtype === "leetcode") {
			canSave = canSave && qlink;
		}

		if (canSave) {
			try {
				setRequestStatus("pending");

				const docRes = await dispatch(
					addNewDocument({
						title: docTitle,
						type: qtype,
						question: docQuestionText,
					})
				).unwrap();

				console.log("IN session -> new document created", docRes);
				//use this id to navigate to desired page
				const URL = `/doc/${docRes.documentId}`;
				setRequestStatus("idle");
				navigate(URL);
			} catch (e) {
				console.log(e);

				window.alert("document not created try again");
				setRequestStatus("idle");
			}
			//as the component unmounts the state is lost
			// finally {
			// 	setRequestStatus("idle");
			// 	setDocQuestionText("");
			// 	setDocTitle("");
			// 	setQtype("");
			// }
		}
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
									<Form className="d-flex flex-column align-items-center">
										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label>Enter Title</Form.Label>
											<Form.Control
												className={styles.input}
												type="text"
												placeholder="Enter title"
												onChange={handleTitleChange}
											/>
										</Form.Group>
										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label>Enter Question</Form.Label>
											<Form.Control
												as="textarea"
												rows={8}
												cols={50}
												onChange={handleTextAreaChange}
											/>
										</Form.Group>

										<Button
											className={styles.formButton}
											type="submit"
											onClick={handleCreateDoc}
										>
											Create Doc
										</Button>
									</Form>
								)}
							</div>
							<div>
								{qtype === "leetcode" && (
									<Form className="d-flex flex-column align-items-center">
										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label>Enter Leetcode Question Link</Form.Label>
											<Form.Control
												className={styles.input}
												type="text"
												placeholder="Enter link"
											/>
										</Form.Group>

										<Button className={styles.formButton} type="submit">
											Create Doc
										</Button>
									</Form>
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
