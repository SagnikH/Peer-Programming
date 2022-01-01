import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/RouterConfig";
import store from "./redux/store";
import Layout from './components/Layout.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Layout>
						<RouterConfig />
					</Layout>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
