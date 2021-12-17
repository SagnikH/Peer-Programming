import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authTokenSlice";
import userReducer from "./userSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
	},
});

// const state = store.getState();
// console.log(state);

// store.subscribe(() => {
// 	console.log("state changed");
// });

export default store;
