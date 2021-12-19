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
		});

		builder.addCase(fetchSessionById.rejected, () => initialState);
	},
});

export default sessionSlice.reducer;
