import Navigation from "./Navigation.js";
import styles from "../styles/layout.module.css";
import Footer from './Footer'

const Layout = (props) => {
	return (
		<div className={styles.layoutcss}>
			<Navigation />
			<div className={styles.mainContent}>{props.children}</div>
			<Footer/>
		</div>
	);
};

export default Layout;