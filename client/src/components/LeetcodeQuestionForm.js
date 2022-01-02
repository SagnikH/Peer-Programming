import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addNewLeetcodeDocument } from "../redux/slices/sessionSlice";
import styles from "../styles/sessions.module.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const Leetcodequestionform = () => {
	const [link, setLink] = useState("");
	const [requestStatus, setRequestStatus] = useState("idle");

	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLinkChange = (e) => {
		setLink(e.target.value);
	};

	const handleCreateDoc = async (e) => {
		e.preventDefault();

		const canSave = requestStatus === "idle" && link;

		if (canSave) {
			try {
				setRequestStatus("pending");

				const docRes = await dispatch(
					addNewLeetcodeDocument({
						link,
						type: "leetcode",
					})
				).unwrap();

				console.log("IN session -> new document created", docRes);
				//use this id to navigate to desired page
				const URL = `doc/${docRes.documentId}`;
				console.log("custom q form navigate", URL);
				setRequestStatus("idle");
				navigate(URL);
			} catch (e) {
				console.log(e);

				window.alert("error in creating doc");
				setRequestStatus("idle");
			}
		}
	};

	return (
		<Form className="d-flex flex-column align-items-center">
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Enter Leetcode Question Link</Form.Label>
				<Form.Control
					className={styles.input}
					type="text"
					placeholder="Enter link"
					value={link}
					onChange={handleLinkChange}
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
};

export default Leetcodequestionform;
