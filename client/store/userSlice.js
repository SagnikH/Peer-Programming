import { createSlice } from "@reduxjs/toolkit";
const _ = require("lodash");

export const useSlice = createSlice({
	name: "user",
	initialState: {
		name: "",
		email: "",
		googleID: "",
		picture: "",
		_id: "",
	},
	reducers: {
		addUser: (state, action) => {
			const { name, email, googleID, picture, _id } = action.payload;
			Object.assign(state, { name, email, googleID, picture, _id });
		},

		removeUser: (state) => {
			Object.assign(state, {});
		},
	},
});

export const { addUser, removeUser } = useSlice.actions;

export default useSlice.reducer;
