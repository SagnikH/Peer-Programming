import styles from "../styles/sessions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { fetchSessionById } from '../redux/actions/sessionActions';

const Sessions = () => {
	const [sessionName, setSessionName] = useState("");
	const [docs, setDocs] = useState([]);
	const [qtype, setQtype] = useState("");
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const dummy = [
		{
			sessionId: "abcdefgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdexzfgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcyudsdfefgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdsrgsefgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdsreerfgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdsrewaefgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdsdfrefgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdsefrgrefgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdstgrefgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdsrefwerfgh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
		{
			sessionId: "abcdsrefwegh",
			cretedAt: new Date().toString(),
			questionTitle: "Two sum",
		},
	];

	const dummyDocs = docs.map((el) => {
		return (
			<div href="/sessions" className={styles.historyItems}>
				<div key={el.sessionId}>
					<div>Id: {el.sessionId}</div>
					<div>Created at: {el.cretedAt}</div>
					<div>Question title: {el.questionTitle}</div>
				</div>
			</div>
		);
	});

	const { id } = useParams();

	//TODO check id validity
	if (!id) {
		// <Navigate to={}
	}


	useEffect(() => {
		setDocs(dummy);
		dispatch(fetchSessionById(id));

		//TODO: decide whether to redirect in case of token not present
		//probably the token will the there as checkAuth mainly handles the loss of state values
	}, []);

	const handleClick = (e) => {
		if (e.target.text === "Leetcode Question") setQtype("leetcode");
		else if (e.target.text === "Custom Question") setQtype("custom");
	};

	return (
		<>
			<div className={styles.body}>
				<p>{id}</p>
				<div className={styles.sessionName}>Session name: {sessionName}</div>
				<div className={styles.sessionContainer}>
					<div className={styles.sessionHistory}>
						<div>
							<div className={styles.historyHeading}>Documents History</div>
						</div>

						<div>{dummyDocs}</div>
					</div>
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
										/>
									</Form.Group>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Enter Question</Form.Label>
										<Form.Control as="textarea" rows={8} cols={50} />
									</Form.Group>

									<Button className={styles.formButton} type="submit">
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
};

export default Sessions;
