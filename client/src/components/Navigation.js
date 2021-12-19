import { useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchToken } from "../redux/actions/authTokenActions";
import { Link } from "react-router-dom";
import favicon from '../assets/favicon.png'
import styles from "../styles/navigation.module.css";

const Navigation = () => {
  const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.token);

  //handle the token for the nav bar here itself
  useEffect(() => {
    console.log("in navbar");
    dispatch(fetchToken());
  }, []);

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
							<a href="http://localhost:4000/auth/google" className={styles.navlink}>
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