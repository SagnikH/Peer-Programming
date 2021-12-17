import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import NotFound404 from "../pages/Error404";

export const RouterConfig = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</>
	);
};
