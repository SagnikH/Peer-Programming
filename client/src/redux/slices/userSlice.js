import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/userActions";

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
		removeUser: () => initialState,
	},

	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			Object.assign(state, action.payload);
		});

		builder.addCase(fetchUser.rejected, () => initialState);
	},
});

export const { removeUser } = useSlice.actions;

export default useSlice.reducer;
