import Navigation from "./Navigation.js";
import styles from "../styles/layout.module.css";

const Layout = (props) => {
	return (
		<div className={styles.layoutcss}>
			<Navigation />
			{props.children}
		</div>
	);
};

export default Layout;