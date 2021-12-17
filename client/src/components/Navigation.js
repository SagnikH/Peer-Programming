import { Navbar, Nav, Container } from "react-bootstrap";
//import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import favicon from '../assets/favicon.png'
import "../styles/navigation.css";

const Navigation = () => {
//	const isLoggedIn = useSelector((state) => state.auth.token);
    const isLoggedIn = false;

	return (
		<Navbar className='navbar' expand="lg">
			<Container className='navbar-container'>
				<Link to="/">
						<img
							className='navbrand'
							src={favicon}
							width="60"
							height="60"
						/>
				</Link>
				<div className="navbar-light" id="basic-navbar-nav">
					<div className='navlinks'>
						{!isLoggedIn && (
							<Link to="/" className='navlink'>
								Sign in
							</Link>
						)}
						{isLoggedIn && (
							<Link to="/dashboard" className='navlink'>
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