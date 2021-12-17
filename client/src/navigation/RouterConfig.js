import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import Home from "../pages/Home";
import NotFound404 from "../pages/Error404";

export const RouterConfig = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound404 />} />
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
