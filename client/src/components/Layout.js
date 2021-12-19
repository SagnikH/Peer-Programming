import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import styles from "../styles/layout.module.css";

const Layout = (props) => {
	return (
		<div className={styles.layoutcss}>
			<Navigation />
			{props.children}
			<Footer />
		</div>
	);
};

export default Layout;