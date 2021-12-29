import { Link } from "react-router-dom";
import styles from "../styles/dashboard.module.css";

import { BsXCircleFill } from "react-icons/bs";

export default function SessionItem(props) {
	const session = props.session;
	const type = props.type;
	const id = type === "session" ? session.sessionId : session.documentId;
	const link = `/${type}/${id}`;

	const getDate = (date) => {
		// console.log(new Date(date));
		if (date) {
			date = new Date(date).toLocaleString("en-IN");
			return date;
		}

		return "";
	};

	return (
		<div className={styles.sessionWrap}>
			<Link to={link} style={{textDecoration: 'none'}}>
				<div className={styles.session}>
					<div>Name: {session.name}</div>
					<div>Date: {getDate(session.createdAt)}</div>
					<div>Link: {link}</div>
				</div>
			</Link>

			<BsXCircleFill
				size="1.5em"
				className={styles.deleteIcon}
				onClick={() => props.handleDelete(id)}
			/>
		</div>
	);
}
