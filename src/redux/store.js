import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authTokenSlice";
import userReducer from "./slices/userSlice";
import sessionReducer from "./slices/sessionSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		session: sessionReducer,
	},
});

// const state = store.getState();
// console.log(state);

// store.subscribe(() => {
// 	console.log("state changed");
// });

export default store;
