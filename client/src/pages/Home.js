import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import InputModal from "../components/InputModal.js";
//import { addUser, removeUser } from "../redux/slices/userSlice";
//import { addToken, removeToken } from "../redux/slices/authTokenSlice";
import styles from '../styles/home.module.css';
//import { fetchSessionById } from "../redux/actions/sessionActions";
import { fetchUser } from "../redux/actions/userActions";
import coWorking from "../assets/co-working.svg";

const Home = () => {
	const [name, setName] = useState("");
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.token);
	const userId = useSelector((state) => state.user._id);

	useEffect(() => {
		//might need to fetch user data if modal is implemented
		dispatch(fetchUser());
	}, []);

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

		//if logged in take the name and userId and send to server->after getting redirect to that session
		//const NAME = "test-session 19/12 ROUNAK"
		console.log("join session userId", userId);
		try {
		} catch (e) {}
	};
	const joinLinkHandler = (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			window.location.href = "http://localhost:4000/auth/google";
		}

		//get the id from given url and use it to find the corresponding session data
		//const link = http://localhost:3000/session/61a9aef6417576b9f074f427
	};

	const handleName = (res) => {
		setName(res);
	}

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
						<InputModal handleName={handleName}/>
						<h4>{name}</h4>

						<Form className="d-flex">
							<Form.Control
								className={styles.formInput}
								type="text"
								placeholder="Enter link"
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
