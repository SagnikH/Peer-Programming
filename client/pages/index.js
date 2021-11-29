import Head from "next/Head";
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
			console.log(e.response);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Apes collab</title>
			</Head>
			<div className={styles.homepage}>
				<div className='mt-3' height="500" width="500">
					<Image
						src="/co-working.svg"
						height="500"
						width="500"
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
					<div>
						<a href="http://localhost:4000/auth/google"  className={styles.button}>
							Sign In
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
