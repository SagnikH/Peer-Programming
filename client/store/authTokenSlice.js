import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: "",
	},
	reducers: {
		addToken: (state, action) => {
			state.token = action.payload;
		},
		removeToken: (state) => {
			Object.assign(state, {});
		},
	},
});

export const { addToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
