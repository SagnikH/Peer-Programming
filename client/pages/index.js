import Head from "next/Head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { Form, Button } from "react-bootstrap";

const Home = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const createLinkHandler = (e) => {
		e.preventDefault();
		if (!loggedIn){
			window.location.href = "http://localhost:4000/auth/google";
		}
	}
	const joinLinkHandler = (e) => {
		e.preventDefault();
		if (!loggedIn){
			window.location.href = "http://localhost:4000/auth/google";
		}
	}
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
					<div className='d-flex w-100 justify-content-around'>
						<Button className={styles.formButton} onClick={createLinkHandler}>
							Create Link
						</Button>
						
						<Form className='d-flex'>
							<Form.Control className={styles.formInput} type="text" placeholder="Enter link" />
							<Button className={styles.formButton} type="submit" onClick={joinLinkHandler}>
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