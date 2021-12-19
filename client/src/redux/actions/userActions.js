import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
	"user/fetchUser",

	async (slug, { rejectWithValue }) => {
		try {
			const res = await axios.get("http://localhost:4000/api/user", {
				withCredentials: true,
			});

			const user = res.data.user;
			const {
				name,
				email,
				googleID,
				picture,
				_id,
				sharedSessions,
				userSessions,
			} = user;

			const actionPayload = {
				name,
				email,
				googleID,
				picture,
				_id,
				sharedSessions,
				userSessions,
			};

			console.log("data from user thunk", actionPayload);
			return actionPayload;
		} catch (e) {
			console.log("error in user thunk", e.response);

			return rejectWithValue(e.response.status);
		}
	}
);
