import JoinForm from "../components/JoinForm.js";
import styles from "../styles/home.module.css";
import coWorking from "../assets/co-working.svg";

const Home = () => {
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
						<JoinForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
