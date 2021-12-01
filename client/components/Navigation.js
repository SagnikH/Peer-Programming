import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "../styles/Navigation.module.css";
import { useSelector } from "react-redux";
import Link from "next/Link";
import Image from "next/image";

const Navigation = () => {
	return (
		<Navbar className={styles.navbar} expand="lg">
			<Container>
				<Link href="/">
					<a>
						<Image
							className={styles.navbrand}
							src="/favicon.png"
							width="60"
							height="60"
						/>
					</a>
				</Link>
				<Navbar.Toggle
					className={styles.navIcon}
					aria-controls="basic-navbar-nav"
				/>
				<Navbar.Collapse className="navbar-light" id="basic-navbar-nav">
					<div className={styles.navlinks}>
						<Nav.Link className="px-0" href="http://localhost:4000/auth/google">
							<div className={styles.navlink}>Sign In</div>
						</Nav.Link>
						<Link href="/dashboard">
							<div className={styles.navlink}>Dashboard</div>
						</Link>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
