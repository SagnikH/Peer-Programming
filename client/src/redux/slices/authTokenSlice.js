import { createSlice } from "@reduxjs/toolkit";
import { fetchToken } from "../actions/authTokenActions";

const initialState = { token: null };

export const authSlice = createSlice({
	name: "auth",
	initialState,

	reducers: {
		removeToken: () => initialState,
	},

	extraReducers: (builder) => {
		builder.addCase(fetchToken.fulfilled, (state, action) => {
			state.token = action.payload;
		});

		builder.addCase(fetchToken.rejected, () => initialState);
	},
});

export const { addToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
