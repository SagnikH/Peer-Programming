import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Container } from 'react-bootstrap';
import styles from '../styles/Navigation.module.css'
import {useSelector} from 'react-redux';
import {handleAuth} from '../store/authSlice';
import Link from 'next/Link'

const Navigation = () => {
    const isLoggedIn = useSelector(handleAuth);
    const redirect = isLoggedIn ? '/dashboard' : '/signin'
    return (  
        <Navbar className={styles.navbar} expand="lg">
            <Container >
                <Link  href="/">
                    <a className={styles.navbrand}>Apes-Collab</a>
                </Link>
                <Navbar.Toggle className={styles.navIcon} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className='navbar-light' id="basic-navbar-nav">
                <div className = {styles.navlinks}>
                    <Nav className="me-auto">
                        <Link  href="/signin"><a className={styles.navlink}>Sign In</a></Link>
                        <Link href={redirect}><a className={styles.navlink}>Dashboard</a></Link>
                    </Nav>
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default Navigation;

