import React from "react";
import SessionItem from "./SessionItem";
import styles from "../styles/dashboard.module.css";

export default function SessionList({title, list, handleDelete}) {
	return (
		<div className={styles.section}>
			<div className={styles.heading}> {title} </div>
			<div className={styles.contents}>
				<div>
					{list.map((item) => {
						return (
							<SessionItem
								item={item}
								handleDelete={handleDelete}
								key={item.id}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
