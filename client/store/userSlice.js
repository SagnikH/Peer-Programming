import { createSlice } from "@reduxjs/toolkit";

export const useSlice = createSlice({
	name: "user",
	initialState: {
		name: "",
		emailId: "",
		dbId: "",
		avatar: "",
	},
	reducers: {
		addUser: (state, action) => {
			const { name, emailId, dbId, avatar } = action.payload;
			Object.assign(state, { name, emailId, dbId, avatar });
		},

    removeUser: (state) => {
      
    }
	},
});
