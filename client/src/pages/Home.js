// import Layout from '../components/Layout.js'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { addUser, removeUser } from "../store/userSlice";
import { addToken, removeToken } from "../store/authTokenSlice";
import "../styles/home.css";
import { Button, Form } from "react-bootstrap";
import coWorking from '../assets/co-working.svg';

const Home = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.token);

	//both login and logout is handled here as both the times we are redirected to this page
	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const res = await axios.get("http://localhost:4000/profile", {
	// 				withCredentials: true,
	// 			});

	// 			// return userData;
	// 			const user = res.data.user;
	// 			const { _id, email, name, googleID, picture } = user;
	// 			const userPayload = { _id, email, name, googleID, picture };
	// 			const TOKEN = JSON.stringify(userPayload); //for local storage
	// 			console.log(userPayload);

	// 			//adding user to user state in redux store
	// 			dispatch(addUser(userPayload));
	// 			dispatch(addToken(TOKEN));

	// 			//add user to local storage
	// 			localStorage.setItem("authUserInfo", TOKEN);

	// 			//add a cookie
	// 			Cookies.set("nextAuthCookie", TOKEN, { sameSite: "strict" });
	// 		} catch (e) {
	// 			// console.log(e.response.status);
	// 			dispatch(removeToken());
	// 			localStorage.removeItem("authUserInfo");
	// 			dispatch(removeUser());
	// 			console.log(e);

	// 			//remove cookie
  //       Cookies.remove("nextAuthCookie");
	// 		}
	// 	})();
	// }, []);

	const createLinkHandler = (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			window.location.href = "http://localhost:4000/auth/google";
		}
	};
	const joinLinkHandler = (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			window.location.href = "http://localhost:4000/auth/google";
		}
	};

	return (
		<>
			<div className='homepage'>
				<img src={coWorking} alt="" height={500} width={500} />
			
				<div className='contents'>
					<div className='subHeading'>Think and Code Together, in</div>
					<div className='heading'>Apes Collab</div>
					<div className='description'>
						Turn your best ideas into reality, by coding and building together
						with your peers and friends, in real-time. So what are you waiting
						for? Let's dive in.
					</div>
					<div className="d-flex w-100 justify-content-around">
						<Button className='formButton' onClick={createLinkHandler}>
							Create Link
						</Button>

						<Form className="d-flex">
							<Form.Control
								className='formInput'
								type="text" 
								placeholder="Enter link"
							/>
							<Button
								className='formButton'
								type="submit"
								onClick={joinLinkHandler}
							>
								Join Link
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
