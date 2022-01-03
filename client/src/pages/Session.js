import styles from "../styles/sessions.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import { BsShareFill } from "react-icons/bs";
import { deleteDocument } from "../redux/slices/sessionSlice";
import SessionList from "../components/SessionList.js";
import ShareIcon from '../components/ShareIcon.js';
import LeetcodeQuestionForm from "../components/LeetcodeQuestionForm.js";
import CustomQuestionForm from "../components/CustomQuestionForm.js";

const Session = () => {
	const [qtype, setQtype] = useState("");
	const [requestStatus, setRequestStatus] = useState("idle");
	const [fetching, setFetching] = useState(1);
	// const user = useSelector((state) => state.user);
	const session = useSelector((state) => state.session);
	const sessionName = useSelector((state) => state.session.name);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();

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

				const docRes = await dispatch(deleteDocument(documentId)).unwrap();

				console.log("IN session -> new document created", docRes);
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
				<div className='d-flex align-items-center justify-content-center'>
					<div className={styles.sessionName}>Session name: {sessionName}</div>
					<ShareIcon size='1.7em' id={'<sessionID>'}/>
				</div>
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
						<div>{qtype === "leetcode" && <LeetcodeQuestionForm setFetching={setFetching} />}</div>
						{fetching===2 && <Spinner animation="border" variant="secondary" className="mt-5" />}
						{fetching===3 && <div className='text-danger mt-3'>Invalid Link!</div>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Session;
