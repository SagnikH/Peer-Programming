// import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "../store/userSlice";
// import { addToken, removeToken } from "../store/authTokenSlice";

// const getUserInfo = async () => {
//   const dispatch = useDispatch();

// 	try {
// 		//fetching user info from backend
// 		const res = await axios.get("http://localhost:4000/profile", {
// 			withCredentials: true,
// 		});

// 		const user = res.data.user;
// 		const { _id, email, name, googleId, picture } = user;
// 		const userPayload = { _id, email, name, googleId, picture };
//     const TOKEN = JSON.stringify(userPayload);  //for local storage

// 		//adding user to user state in redux store
// 		dispatch(addUser({userPayload}));
// 		dispatch(addToken({TOKEN}));

// 		//add user to local storage
// 		localStorage.setItem("authUserInfo", TOKEN);
// 	} catch (e) {
// 		//clear user state and auth token
//     dispatch(removeToken());
//     dispatch(removeUser());

// 		console.log(e);
// 	}
// };

// export default getUserInfo;