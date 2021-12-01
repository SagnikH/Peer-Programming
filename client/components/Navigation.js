import {
	Navbar,
	NavItem,
	NavDropdown,
	MenuItem,
	Nav,
	Container,
} from "react-bootstrap";
import styles from "../styles/Navigation.module.css";
import { useSelector } from "react-redux";
import Link from "next/Link";

const Navigation = () => {
	const token = useSelector((state) => state.auth.token);
	// console.log(token);

	return (
		<Navbar className={styles.navbar} expand="lg">
			<Container>
				<Link href="/">
					<a className={styles.navbrand}>Apes-Collab</a>
				</Link>
				<Navbar.Toggle
					className={styles.navIcon}
					aria-controls="basic-navbar-nav"
				/>
				<Navbar.Collapse className="navbar-light" id="basic-navbar-nav">
					<div className={styles.navlinks}>
						<Nav className="me-auto">
							{token ? (
								<Link
									className={styles.navlink}
									href="http://localhost:4000/auth/logout"
								>
									Log Out
								</Link>
							) : (
								<Link
									className={styles.navlink}
									href="http://localhost:4000/auth/google"
								>
									Sign In
								</Link>
							)}
							<Link className={styles.navlink} href="/dashboard">
								Dashboard
							</Link>
						</Nav>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
