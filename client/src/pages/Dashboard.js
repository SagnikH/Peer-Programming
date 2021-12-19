import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/actions/userActions";
import Alert from "../components/Alert.js";
import InputModal from "../components/InputModal.js";
import Loading from '../components/Loading.js';
import styles from "../styles/dashboard.module.css";
import sessions from "../assets/sessions.json";
import { Button, Form } from "react-bootstrap";
import styles2 from '../styles/home.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
	//passed as a prop to modal to be used as a callback to logout
    const [loading, setLoading] = useState(true);
	const [name, setName] = useState("");
    
	const logoutHandler = (e) => {
		window.location.href = "http://localhost:4000/auth/logout";
	};

	const user = useSelector((state) => state.user);

	const getDate = (date) => {
		return date.slice(5, 15);
	}

	useEffect(() => {
		//always at the beginning check to see if token exists in LC mainly to handle page refresh and loosing the state

		dispatch(fetchUser());

        setTimeout(() => {
            setLoading(false);
        }, 1000)

		//TODO: decide whether to redirect in case of token not present
		//probably the token will the there as checkAuth mainly handles the loss of state values
	}, []);

	const createLinkHandler = (e) => {
		e.preventDefault();
		if (!user) {
			window.location.href = "http://localhost:4000/auth/google";
		}
	};
	const joinLinkHandler = (e) => {
		e.preventDefault();
		if (!user) {
			window.location.href = "http://localhost:4000/auth/google";
		}
	};

	const handleName = (res) => {
		setName(res);
	}
    
    
	

	return (
		<>
            {loading ? <Loading/> : 
            
            <>
			<div className={styles.dashboard}>
				<div className={styles.section}>
					<div className={styles.heading}>User Information</div>
					<div className={styles.userContents}>
						<img
							src={user.picture}
							alt="Image"
							width="200"
							height="200"
							className={styles.userImage}
						></img>
						<div className={styles.userDetails}>
							<h6>Name:</h6>
							<h6>{user.name}</h6>
							<h6>Email Id:</h6>
							<h6> {user.email}</h6>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.heading}> Created Sessions </div>
					<div className={styles.contents}>
						<div>
							{sessions.map((session)=>{
								return (
									<div className={styles.session}>
										<div>Name: {session.Name}</div>
										<div>Date: {getDate(session.Date)}</div>
										<div>Link: {session.Link}</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.heading}> Shared Sessions </div>
					<div className={styles.contents}>
						<div>
							{sessions.map((session)=>{
								return (
									<div className={styles.session}>
										<div>Name: {session.Name}</div>
										<div>Date: {getDate(session.Date)}</div>
										<div>Link: {session.Link}</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.buttons}>
				
				<div className={styles.linkButtons}>
					<InputModal handleName={handleName}/>
					<h4>{name}</h4>

					<Form className="d-flex">
						<Form.Control
							className={styles2.formInput}
							type="text"
							placeholder="Enter link"
						/>
						<Button
							className={styles2.formButton}
							type="submit"
							onClick={joinLinkHandler}
						>
							Join Link
						</Button>
					</Form>
				</div>

				<div className={styles.logoutButton}>
					<Alert alertFunction={logoutHandler} />
				</div>
				
			</div>
			
            </>
        }
		</>
	);
};

export default Dashboard;
