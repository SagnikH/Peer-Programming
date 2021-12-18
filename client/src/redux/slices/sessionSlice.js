import { createSlice } from "@reduxjs/toolkit";
import { fetchSessionById } from "../actions/sessionActions";

const initialState = {
  name: "", 
  _id: "", 
  documents: []
}

export const sessionSlice = createSlice({
	name: "session",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSessionById.fulfilled, (state, action) => {
			Object.assign(state, action.payload);
		});

		builder.addCase(fetchSessionById.rejected, () => initialState);
	},
});

export default sessionSlice.reducer;
