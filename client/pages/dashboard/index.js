import { useEffect } from "react";
import { useSelector } from "react-redux";
import checkAuthToken from "../../utils/checkAuthTokenUtil";
import styles from "../../styles/Dashboard.module.css";
import Alert from "../../components/Alert.js";
import Layout from '../../components/Layout.js';

const dashboard = () => {
	//passed as a prop to modal to be used as a callback to logout
	const logoutHandler = (e) => {
		window.location.href = "http://localhost:4000/auth/logout";
	};

	const user = useSelector((state) => state.user);

	useEffect(() => {
		//always at the beginning check to see if token exists in LC mainly to handle page refresh and loosing the state

		checkAuthToken(user);

		//TODO: decide whether to redirect in case of token not present
		//probably the token will the there as checkAuthToken mainly handles the loss of state values
	}, []);
	return (
		<Layout>
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
		</Layout>
	);
};

export default dashboard;


/*
<img
	src="/favicon.png"
	width="200"
	height="200"
	className={styles.userImage}
></img>
						*/

/*
<div className={styles.userImage}>

</div>
*/

/* was giving me weird errors regarding webpack that I didn't understand.
Then I installed npm module 'jest-worker'
and now it's working fine. The webpack errors are not there anymore
But the browser errors are still there*/