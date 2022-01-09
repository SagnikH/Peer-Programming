import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "dotenv";
config();

const initialState = {
	name: "",
	email: "",
	googleID: "",
	picture: "",
	_id: "",
	sharedSessions: [],
	userSessions: [],
	status: "idle",
	error: null,
};

export const createSession = createAsyncThunk(
	"user/createSession",

	async ({ name, userId }, { rejectWithValue }) => {
		try {
			console.log("creating session thunk", { name, userId });

			console.log("sending request for session");

			const session = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/api/session`,
				{ name, userId },
				{ withCredentials: true }
			);

			// console.log("new session created", res.data);

			const userSession = {
				name,
				sessionId: session.data._id,
				createdAt: session.data.createdAt,
			};
			console.log("server userSession", userSession);

			return userSession;
		} catch (e) {
			console.log("creation error in session thunk", e.response);
			return rejectWithValue(e.response.status);
		}
	}
);

export const addSharedSession = createAsyncThunk(
	"user/addSharedSessions",

	async ({ sessionId, userId }, { rejectWithValue }) => {
		try {
			console.log("creating shared session thunk", { userId });

			console.log("sending request for session");

			const session = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/api/session/shared/${sessionId}`,
				{ userId },
				{ withCredentials: true }
			);

			console.log("new shared session created", session.data);

			if (session.data) {
				const sharedSession = {
					name: session.data.name,
					sessionId: session.data._id,
					createdAt: session.data.createdAt,
				};

				console.log("server sharedSession", sharedSession);
				return sharedSession;
			} else return "";
		} catch (e) {
			console.log("creation error in session thunk", e.response);
			return rejectWithValue(e.response.status);
		}
	}
);

export const deleteSession = createAsyncThunk(
	"user/deleteSession",

	async (sessionId, { rejectWithValue }) => {
		try {
			const delSession = await axios.delete(
				`${process.env.REACT_APP_SERVER_URL}/api/session/${sessionId}`,
				{ withCredentials: true }
			);

			console.log("deleting session", delSession.data);
			return delSession.data._id;
		} catch (e) {
			console.log("creation error in session thunk", e.response);
			return rejectWithValue(e.response.status);
		}
	}
);

export const deleteSharedSession = createAsyncThunk(
	"user/deleteSharedSession",

	async ({ sessionId, userId }, { rejectWithValue }) => {
		try {
			console.log({ userId });
			const delSession = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/session/shared/${sessionId}`,
				{ userId },
				{ withCredentials: true }
			);

			console.log("deleting shared session", delSession.data);
			return delSession.data._id;
		} catch (e) {
			console.log("creation error in shared session thunk", e.response);
			return rejectWithValue(e.response.status);
		}
	}
);

export const fetchUser = createAsyncThunk(
	"user/fetchUser",

	async (slug, { rejectWithValue }) => {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/api/user`,
				{
					withCredentials: true,
				}
			);
			// console.log(res);

			const actionPayload = res.data;

			console.log("data from user thunk", actionPayload);
			return actionPayload;
		} catch (e) {
			console.log("error in user thunk", e);

			return rejectWithValue(e.response.status);
		}
	}
);

export const useSlice = createSlice({
	name: "user",
	initialState,

	reducers: {
		removeUser: () => initialState,

		addUserSessions: (state, action) => {
			state.userSessions.push(action.payload);
		},

		removeUserSessions: (state, action) => {
			const newUserSessions = state.userSessions.filter(
				(session) => session.sessionId !== action.payload
			);

			state.userSessions = newUserSessions;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.status = "loading";
		});

		builder.addCase(fetchUser.fulfilled, (state, action) => {
			Object.assign(state, action.payload);
			state.status = "succeeded";
		});

		builder.addCase(fetchUser.rejected, (state, action) => {
			// state = initialState;
			for (const [key, value] of Object.entries(initialState)) {
				state[key] = value;
			}

			state.status = "failed";

			if (action.payload) {
				console.log("payload", action.payload);
				// Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
				state.error = action.payload;
			} else {
				state.error = action.error.message;
			}
		});

		builder.addCase(createSession.fulfilled, (state, action) => {
			state.userSessions.push(action.payload);
		});

		builder.addCase(addSharedSession.fulfilled, (state, action) => {
			if (action.payload) {
				const _id = action.payload.sessionId;
				const pos = state.sharedSessions
					.map((session) => {
						return session.sessionId;
					})
					.indexOf(_id);

				if (pos === -1) {
					console.log("pelam na");
					state.sharedSessions.push(action.payload);
				}
			}
		});

		builder.addCase(deleteSession.fulfilled, (state, action) => {
			const newUserSessions = state.userSessions.filter(
				(session) => session.sessionId !== action.payload
			);

			state.userSessions = newUserSessions;
		});

		builder.addCase(deleteSharedSession.fulfilled, (state, action) => {
			const newSharedSessions = state.sharedSessions.filter(
				(session) => session.sessionId !== action.payload
			);

			state.sharedSessions = newSharedSessions;
		});
	},
});

export const { removeUser } = useSlice.actions;

export default useSlice.reducer;
