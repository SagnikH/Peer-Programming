import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  googleID: "",
  picture: "",
  _id: "",
  sharedSessions: [],
  userSessions: [],
};

export const useSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action) => {
			const { name, email, googleID, picture, _id, sharedSessions, userSessions } = action.payload;
			Object.assign(state, { name, email, googleID, picture, _id, sharedSessions, userSessions });
		},

		removeUser: () => initialState
	},
});

export const { addUser, removeUser } = useSlice.actions;

export default useSlice.reducer;
