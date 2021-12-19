import { createSlice } from "@reduxjs/toolkit";
import { fetchSessionById } from "../actions/sessionActions";

const initialState = {
  name: "", 
  _id: "", 
  documents: [],
  error: null,
}

export const sessionSlice = createSlice({
	name: "session",
	initialState,

	reducers: {
    //receives an object when a new
    addNewDocument: (state, action) => {
      state.documents.push(action.payload);
    },

    removeDocument: (state, action) => {
      const newDocuments = state.documents.filter(document => document.documentId !== action.payload);

      state.documents = newDocuments;
    }
  },
  
	extraReducers: (builder) => {
		builder.addCase(fetchSessionById.fulfilled, (state, action) => {
			Object.assign(state, action.payload);
      state.error = false;
		});

		builder.addCase(fetchSessionById.rejected, (state) => {
      state.name = "";
      state._id = "";
      state.documents = [];
      state.error = true;
    });
	},
});

export default sessionSlice.reducer;
