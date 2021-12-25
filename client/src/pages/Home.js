import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputModal from "../components/InputModal.js";
import styles from "../styles/home.module.css";
import { fetchSessionById } from "../redux/slices/sessionSlice";
import { createSession } from "../redux/slices/userSlice";
import { fetchUser } from "../redux/slices/userSlice";
import coWorking from "../assets/co-working.svg";

const Home = () => {
	const [modalResponse, setModalResponse] = useState("");
	const [joinLinkValue, setJoinLinkValue] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.auth.token);
	// const user = useSelector((state) => state.user);
	const userId = useSelector((state) => state.user._id);
	const userStatus = useSelector((state) => state.user.status);

	const [addRequestStatus, setAddRequestStatus] = useState("idle");

	useEffect(() => {
		//might need to fetch user data if modal is implemented
		if (userStatus === "idle") {
			dispatch(fetchUser());
		}
	}, [userStatus, dispatch]);

	//testing
	useEffect(() => {
		// (async () => {
		// 	try {
		// 		const response = await axios.get(
		// 			"http://localhost:4000/api/session/61a9aef6417576b9f074f427",
		// 			{
		// 				withCredentials: true,
		// 			}
		// 		);
		// 		console.log(response.data);
		// 	} catch (e) {
		// 		console.log(e.response);
		// 	}
		// })();
		// const _id = "61a9aef6417576b9f074f427";
		// dispatch(fetchSessionById(_id));
		// console.log("calling fetchuser thunk");
		// dispatch(fetchUser());
	}, []);

	const createLinkHandler = async (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			window.location.href = "http://localhost:4000/auth/google";

			return;
		}
	};

	const handleJoinLinkChange = (e) => {
		setJoinLinkValue(e.target.value);
	};

	const joinLinkHandler = (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			window.location.href = "http://localhost:4000/auth/google";

			return;
		}

		//get the id from given url and use it to find the corresponding session data
		//TODO: handle if user only enters the sessionId
		// var URL = "http://localhost:3000/session/61c0e8f7fd1dbb86d17cb52b";
		var URL = joinLinkValue;
		console.log("URL :", URL);
		var newURL = URL.replace(
			/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/,
			"$1"
		); // http or https

		navigate(newURL);
	};

	const handleName = (modalResponse) => {
		setModalResponse(modalResponse);
	};

	useEffect(() => {
		console.log("modalResponse :", modalResponse);

		const canSave = addRequestStatus === "idle" && modalResponse;

		//send request to backend
		if (canSave) {
			(async () => {
				try {
					setAddRequestStatus("pending");

					const sessRes = await dispatch(
						createSession({ name: modalResponse, userId })
					).unwrap();

					console.log(sessRes); //newly created session data

					const URL = `/session/${sessRes.sessionId}`;
					navigate(URL);
				} catch (e) {
					console.log(e);

					//catches error, show a generic alert
					window.alert("enter session name / refresh");
					setAddRequestStatus("idle");
				}
			})();
		}
	}, [modalResponse]);

	return (
		<>
			<div className={styles.homepage}>
				<img src={coWorking} alt="" height={500} width={500} />

				<div className={styles.contents}>
					<div className={styles.subHeading}>Think and Code Together, in</div>
					<div className={styles.heading}>Apes Collab</div>
					<div className={styles.description}>
						Turn your best ideas into reality, by coding and building together
						with your peers and friends, in real-time. So what are you waiting
						for? Let's dive in.
					</div>
					<div className="d-flex w-100 justify-content-around">
						<InputModal handleName={handleName} />
						<h4>{modalResponse}</h4>

						<Form className="d-flex">
							<Form.Control
								className={styles.formInput}
								type="text"
								placeholder="Enter link"
								onChange={handleJoinLinkChange}
								value={joinLinkValue}
							/>
							<Button
								className={styles.formButton}
								type="submit"
								onClick={joinLinkHandler}
							>
								Join Link
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
