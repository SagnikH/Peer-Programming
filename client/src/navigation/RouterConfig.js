import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import Home from "../pages/Home";
import NotFound404 from "../pages/Error404";
import Dashboard from "../pages/Dashboard";
import Sessions from "../pages/Sessions";
import Doc from "../pages/Doc";

export const RouterConfig = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound404 />} />
				<Route path="/dashboard" element={<Dashboard/>} />
				<Route path="/sessions" element={<Sessions/>} />
				<Route path="/doc" element={<Doc/>} />
				<Route
					path="/app"
					element={
						<PrivateRoute>
							<h1> Private App </h1>
						</PrivateRoute>
					} 
				/>
			</Routes>
		</>
	);
};
