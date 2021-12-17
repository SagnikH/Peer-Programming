import "./App.css";
import { Provider } from "react-redux";
// import Navigation from "./components/Navigation";
// import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/RouterConfig";
import store from "./store/store";

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<RouterConfig />
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
