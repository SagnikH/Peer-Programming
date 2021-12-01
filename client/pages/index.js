import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser, removeUser } from "../store/userSlice";
import { addToken, removeToken } from "../store/authTokenSlice";
import styles from "../styles/Home.module.css";

const Home = () => {
	const dispatch = useDispatch();

	const handleStateChange = (res) => {
		if (res) {
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
		} else {
			//clear user state and auth token
			dispatch(removeToken());
			dispatch(removeUser());
		}
	};

	useEffect(() => {
		let res = async () => {
			try {
				const userData = await axios.get("http://localhost:4000/profile", {
					withCredentials: true,
				});

				return userData;
			} catch (e) {
				console.log(e);
			}
		};

		res()
			.then((now) => {
				handleStateChange(now);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<>
			<Head>
				<title>Apes collab</title>
			</Head>
			<div className={styles.homepage}>
				<div className={styles.cover} height="400" width="400">
					<Image
						className={styles.coverImg}
						src="/cover.jpeg"
						height="400"
						width="400"
					/>
				</div>
				<div className={styles.contents}>
					<div className={styles.subHeading}>Think and Code Together, in</div>
					<div className={styles.heading}>Apes Collab</div>
					<div className={styles.description}>
						Turn your best ideas into reality, by coding and building together
						with your peers and friends, in real-time. So what are you waiting
						for? Let's dive in.
					</div>
					<div className={styles.button}>
						<a href="http://localhost:4000/auth/google">
							<div className={styles.navlink}>Sign In</div>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
