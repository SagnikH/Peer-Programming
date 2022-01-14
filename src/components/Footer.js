import styles from "../styles/footer.module.css";
import {Link} from 'react-router-dom';

const Footer = () => {
	return(
		<>
		<div className={styles.footercss}>
			<div >Copyright: apes webdev</div>
			<Link to="/aboutUs" className={styles.footerLink}>(know more) </Link>
		</div>
				
		</>
	)
		
};

export default Footer;
