import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "../styles/navigation.css";
//import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navigation = () => {
//	const isLoggedIn = useSelector((state) => state.auth.token);
    const isLoggedIn = false;

	return (
		<Navbar className={styles.navbar} expand="lg">
			<Container>
				<Link to="/">
						<img
							className={styles.navbrand}
							src="/favicon.png"
							width="60"
							height="60"
						/>
				</Link>
				<div className="navbar-light" id="basic-navbar-nav">
					<div className={styles.navlinks}>
						{!isLoggedIn && (
							<Link to="/">
								Sign in
							</Link>
						)}
						{isLoggedIn && (
							<Link to="/dashboard">
								Dashboard
							</Link>
						)}
					</div>
				</div>
			</Container>
		</Navbar>
	);
};

export default Navigation;