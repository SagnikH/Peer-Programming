import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import "../styles/layout.css";

const Layout = (props) => {
	return (
		<div className='layoutcss'>
			<Navigation />
			{props.children}
			<Footer />
		</div>
	);
};

export default Layout;