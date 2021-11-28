import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { Button } from "react-bootstrap";

const Home = () => {
	useEffect(async () => {
		try {
			const res = await axios.get("http://localhost:4000/profile", {
				withCredentials: true,
			});
			//we get the user here, update the state now with user info and set authenticated flag
			if (res) console.log(res);
		} catch (e) {
			//clear user state and unset authenticated flag
			console.log(e.response.status);
		}
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
