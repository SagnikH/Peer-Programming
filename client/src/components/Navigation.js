import { useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchToken } from "../redux/slices/authTokenSlice";
import { fetchUser } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";
import favicon from "../assets/favicon.png";
import styles from "../styles/navigation.module.css";
import dotenv from "dotenv";
dotenv.config();

const Navigation = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.token);
	const authStatus = useSelector((state) => state.auth.status);
	const userStatus = useSelector((state) => state.user.status);

	useEffect(() => {
		console.log(process.env.REACT_APP_SERVER_URL);
	}, []);

	useEffect(() => {
		// console.log("in navbar");

		if (authStatus === "idle") {
			// console.log("dispatching..... fetchToken()");
			dispatch(fetchToken());
		}
	}, [authStatus, dispatch]);

	useEffect(() => {
		//might need to fetch user data if modal is implemented
		if (userStatus === "idle") {
			dispatch(fetchUser());
		}
	}, [userStatus, dispatch]);

	return (
		<Navbar className={styles.navbar} expand="lg">
			<Container>
				<Link to="/">
					<img
						className={styles.navbrand}
						src={favicon}
						width="60"
						height="60"
					/>
				</Link>
				<div className="navbar-light" id="basic-navbar-nav">
					<div className={styles.navlinks}>
						{!isLoggedIn && (
							<a
								href={`${process.env.REACT_APP_SERVER_URL}/auth/google`}
								className={styles.navlink}
							>
								Sign in
							</a>
						)}
						{isLoggedIn && (
							<Link to="/dashboard" className={styles.navlink}>
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
