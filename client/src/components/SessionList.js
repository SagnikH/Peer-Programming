import React from "react";
import SessionItem from "./SessionItem";
import styles from "../styles/dashboard.module.css";

export default function SessionList(props) {
	const sessionList = props.sessions;
	const title = props.title;
	console.log("Printing the change");
	return (
		<div className={styles.section}>
			<div className={styles.heading}> {title} </div>
			<div className={styles.contents}>
				<div>
					{sessionList.map((session) => {
						return (
							<SessionItem
								session={session}
								type={props.type}
								key={Math.random()}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
