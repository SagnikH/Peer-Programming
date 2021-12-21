import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import Dashboard from "../pages/Dashboard";
import Sessions from "../pages/Sessions";
import Doc from "../pages/Doc";

export const RouterConfig = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				<Route
					path="/session"
					element={
						<PrivateRoute>
							<Navigate to="/dashboard" />
						</PrivateRoute>
					}
				/>
				<Route
					path="/session/:id"
					element={
						<PrivateRoute>
							<Sessions />
						</PrivateRoute>
					}
				/>
				<Route
					path="/doc"
					element={
						<PrivateRoute>
							<Doc />
						</PrivateRoute>
					}
				/>
				<Route
					path="/app"
					element={
						<PrivateRoute>
							<h1> Private App </h1>
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</>
	);
};
