import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/actions/userActions";
import Alert from "../components/Alert.js";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();
	//passed as a prop to modal to be used as a callback to logout
	const logoutHandler = (e) => {
		window.location.href = "http://localhost:4000/auth/logout";
	};

	const user = useSelector((state) => state.user);

	useEffect(() => {
    dispatch(fetchUser());
	}, []);

	return (
		<>
			<div className={styles.dashboard}>
				<div className={styles.userInfoSection}>
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
				<div className={styles.sessionsSection}>
					<div className={styles.heading}> Created Sessions </div>
					<div className={styles.contents}>
						<ul>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.sessionsSection}>
					<div className={styles.heading}> Shared Sessions </div>
					<div className={styles.contents}>
						<ul>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
							<li>
								<div>Time: </div>
								<div>Link:</div>
								<a></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className={styles.logoutButton}>
				<Alert alertFunction={logoutHandler} />
			</div>
		</>
	);
};

export default Dashboard;
