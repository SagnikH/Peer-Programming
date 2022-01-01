import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSession } from "../redux/slices/userSlice";
import InputModal from "./InputModal.js";
import { Button, Form } from "react-bootstrap";
import styles2 from "../styles/home.module.css";
import styles from "../styles/dashboard.module.css";
import { config } from "dotenv";
config();

export default function JoinForm() {
	const userId = useSelector((state) => state.user._id);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.auth.token);
	const [modalResponse, setModalResponse] = useState("");
	const [requestStatus, setRequestStatus] = useState("idle");
	const [joinLinkValue, setJoinLinkValue] = useState("");

	const handleName = (modalResponse) => {
		setModalResponse(modalResponse);
	};

	const handleJoinLinkChange = (e) => {
		setJoinLinkValue(e.target.value);
	};

	const joinLinkHandler = (e) => {
		e.preventDefault();

		if (!isLoggedIn) {
			window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
		}

		//TODO: handle if only id is given
		var URL = joinLinkValue;
		console.log("URL :", URL);
		var newURL = URL.replace(
			/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/,
			"$1"
		); // http or https

		navigate(newURL);
	};

	useEffect(() => {
		console.log("modalResponse :", modalResponse);

		const canSave = requestStatus === "idle" && modalResponse;

		//send request to backend
		if (canSave) {
			(async () => {
				try {
					setRequestStatus("pending");

					const sessRes = await dispatch(
						createSession({ name: modalResponse, userId })
					).unwrap();

					//remove states

					console.log(sessRes); //newly created session data
					setRequestStatus("idle");

					const URL = `/session/${sessRes.sessionId}`;
					navigate(URL);
				} catch (e) {
					console.log(e);

					//catches error, show a generic alert
					window.alert("enter session name / refresh");
					setRequestStatus("idle");
				}
			})();
		}
	}, [modalResponse]);

	return (
		<div>
			<div className={styles.linkButtons}>
				<InputModal handleName={handleName} />

				<Form className="d-flex">
					<Form.Control
						className={styles2.formInput}
						type="text"
						placeholder="Enter link"
						onChange={handleJoinLinkChange}
						value={joinLinkValue}
					/>
					<Button
						className={styles2.formButton}
						type="submit"
						onClick={joinLinkHandler}
					>
						Join Link
					</Button>
				</Form>
			</div>
		</div>
	);
}
