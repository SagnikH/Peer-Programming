import Head from "next/Head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser, removeUser } from "../store/userSlice";
import { addToken, removeToken } from "../store/authTokenSlice";
import styles from "../styles/Home.module.css";
import { Button, Form } from "react-bootstrap";

const Home = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.token);

	//both login and logout is handled here as both the times we are redirected to this page
	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get("http://localhost:4000/profile", {
					withCredentials: true,
				});

				// return userData;
				const user = res.data.user;
				const { _id, email, name, googleID, picture } = user;
				const userPayload = { _id, email, name, googleID, picture };
				const TOKEN = JSON.stringify(userPayload); //for local storage
				console.log(userPayload);

				//adding user to user state in redux store
				dispatch(addUser(userPayload));
				dispatch(addToken(TOKEN));

				//add user to local storage
				localStorage.setItem("authUserInfo", TOKEN);
			} catch (e) {
        // console.log(e.response.status);
				dispatch(removeToken());
				localStorage.removeItem("authUserInfo");
				dispatch(removeUser());
				console.log(e);
			}
		})();
	}, []);

	const createLinkHandler = (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			window.location.href = "http://localhost:4000/auth/google";
		}
	};
	const joinLinkHandler = (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			window.location.href = "http://localhost:4000/auth/google";
		}
	};

	return (
		<>
			<div className={styles.homepage}>
				<div className="mt-3" height="500" width="500">
					<Image src="/co-working.svg" height="500" width="500" />
				</div>
				<div className={styles.contents}>
					<div className={styles.subHeading}>Think and Code Together, in</div>
					<div className={styles.heading}>Apes Collab</div>
					<div className={styles.description}>
						Turn your best ideas into reality, by coding and building together
						with your peers and friends, in real-time. So what are you waiting
						for? Let's dive in.
					</div>
					<div className="d-flex w-100 justify-content-around">
						<Button className={styles.formButton} onClick={createLinkHandler}>
							Create Link
						</Button>

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
