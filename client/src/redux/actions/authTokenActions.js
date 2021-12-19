import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchToken = createAsyncThunk(
	"auth/fetchToken",

	async (slug, { rejectWithValue }) => {
		try {
			const res = await axios.get("http://localhost:4000/api/user", {
				withCredentials: true,
			});

			const user = res.data.user;

			const actionPayload = JSON.stringify(user);

			console.log("data from authToken thunk", actionPayload);
			return actionPayload;
		} catch (e) {
			console.log("error in authToken thunk", e.response);

			return rejectWithValue(e.response.status);
		}
	}
);
