import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	name: "",
	_id: "",
  userId: "",
	documents: [],
	status: "idle",
	error: null,
};

export const fetchSessionById = createAsyncThunk(
	"session/fetchById",

	async (sessionId, { rejectWithValue }) => {
		try {
			const res = await axios.get(
				`http://localhost:4000/api/session/${sessionId}`,
				{
					withCredentials: true,
				}
			);
      // console.log(res.data);
			const { documents, _id, name, userId } = res.data;
			const actionPayload = { documents, _id, name, userId };
			console.log("data in session thunk", actionPayload);
			return actionPayload;
		} catch (e) {
			console.log("error in session thunk", e.response);
			return rejectWithValue(e.response.status);
		}
	}
);

export const sessionSlice = createSlice({
	name: "session",
	initialState,

	reducers: {
		//receives an object when a new
		addNewDocument: (state, action) => {
			state.documents.push(action.payload);
		},

		removeDocument: (state, action) => {
			const newDocuments = state.documents.filter(
				(document) => document.documentId !== action.payload
			);

			state.documents = newDocuments;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchSessionById.pending, (state) => {
			state.status = "loading";
		});

		builder.addCase(fetchSessionById.fulfilled, (state, action) => {
			Object.assign(state, action.payload);
			state.status = "succeeded";
		});

		builder.addCase(fetchSessionById.rejected, (state, action) => {
			// state = initialState;
			for (const [key, value] of Object.entries(initialState)) {
				state[key] = value;
			}

			state.status = "failed";

			if (action.payload) {
				// Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
				state.error = action.payload.errorMessage;
			} else {
				state.error = action.error.message;
			}
		});
	},
});

export default sessionSlice.reducer;
