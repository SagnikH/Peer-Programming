import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

			const { documents, _id, name } = res.data;
			const actionPayload = { documents, _id, name };
			console.log("data in session thunk", actionPayload);
			return actionPayload;
		} catch (e) {
			console.log("error in session thunk", e.response);
			return rejectWithValue(e.response.status);
		}
	}
);
