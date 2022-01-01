import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import Dashboard from "../pages/Dashboard";
import Session from "../pages/Session";
import Doc from "../pages/Doc";
import SessionWrapper from "../pages/SessionWrapper";

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
					path="/app"
					element={
						<PrivateRoute>
							<h1> Private App </h1>
						</PrivateRoute>
					}
				/>

				<Route
					path="session/:id"
					element={
						<PrivateRoute>
							<SessionWrapper />
						</PrivateRoute>
					}
				>
					<Route
						path=""
						element={
							<PrivateRoute>
								<Session />
							</PrivateRoute>
						}
					/>
					<Route
						path="doc/:did"
						element={
							<PrivateRoute>
								<Doc />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</>
	);
};
