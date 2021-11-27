import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Container } from 'react-bootstrap';
import styles from '../styles/Navigation.module.css'

const Navigation = () => {
    return (  
        <Navbar className={styles.navbar} expand="lg">
            <Container >
                <Navbar.Brand className='text-light' href="#home">Apes-collab</Navbar.Brand>
                <Navbar.Toggle className={styles.navIcon} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className='navbar-light' id="basic-navbar-nav">
                <div className = {styles.navlinks}>
                    <Nav className="me-auto">
                        <Nav.Link className='text-light' href="#home">Sign In</Nav.Link>
                        <Nav.Link className='text-light' href="#link">Dashboard</Nav.Link>
                    </Nav>
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default Navigation;

