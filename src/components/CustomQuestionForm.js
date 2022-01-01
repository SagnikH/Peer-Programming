import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../styles/sessions.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewDocument } from "../redux/slices/sessionSlice";

export default function CustomQuestionForm() {
	const [docTitle, setDocTitle] = useState("");
	const [docQuestionText, setDocQuestionText] = useState("");
	const [requestStatus, setRequestStatus] = useState("idle");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { id } = useParams();

	const handleTitleChange = (e) => {
		setDocTitle(e.target.value);
	};

	const handleTextAreaChange = (e) => {
		setDocQuestionText(e.target.value);
	};

	const handleCreateDoc = async (e) => {
		console.log("creating doc......");
		e.preventDefault();

		let canSave = requestStatus === "idle";

		canSave = canSave && docTitle && docQuestionText;
		console.log("Entered custom section", canSave);

		if (canSave) {
			try {
				setRequestStatus("pending");

				const docRes = await dispatch(
					addNewDocument({
						title: docTitle,
						type: "custom",
						question: docQuestionText,
					})
				).unwrap();

				console.log("IN session -> new document created", docRes);
				//use this id to navigate to desired page
				const URL = `doc/${docRes.documentId}`;
				console.log("custom q form navigate", URL);
				setRequestStatus("idle");
				navigate(URL);

				//TODO: handle new url routing
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
	return (
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
	);
}
