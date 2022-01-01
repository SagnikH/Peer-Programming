import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "dotenv";
config();

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
				`${process.env.REACT_APP_SERVER_URL}/api/session/${sessionId}`,
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

export const addNewDocument = createAsyncThunk(
	"session/createDoc",

	async ({ title, type, question }, { rejectWithValue, getState }) => {
		const state = getState();

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/api/document`,
				{
					title,
					type,
					// link, ->handle with leetcode
					question,
					userId: state.session.userId,
					sessionId: state.session._id,
				},
				{ withCredentials: true }
			);

			const actionPayload = {
				documentId: res.data._id,
				title: res.data.title,
				createdAt: res.data.createdAt,
			};

			console.log("creating document async thunk", actionPayload);
			return actionPayload;
		} catch (e) {
			return rejectWithValue(e.response.status);
		}
	}
);

export const deleteDocument = createAsyncThunk(
	"session/deleteDoc",

	async (documentId, { rejectWithValue }) => {
		try {
			const delDocument = await axios.delete(
				`${process.env.REACT_APP_SERVER_URL}/api/document/${documentId}`
			);

			console.log("deleting session", delDocument.data);
			return delDocument.data._id;
		} catch (e) {
			console.log("creation error in session thunk", e.response);
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

		builder.addCase(addNewDocument.fulfilled, (state, action) => {
			state.documents.push(action.payload);
		});

		builder.addCase(deleteDocument.fulfilled, (state, action) => {
			const newSessionDocs = state.documents.filter(
				(document) => document.documentId !== action.payload
			);

			state.documents = newSessionDocs;
		});
	},
});

export default sessionSlice.reducer;
