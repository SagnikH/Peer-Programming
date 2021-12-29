import { Link } from "react-router-dom";
import styles from "../styles/dashboard.module.css";

import { BsXCircleFill } from "react-icons/bs";

export default function SessionItem(props) {
	const name = props.item.name;
	const link = props.item.link;
	const id = props.item.id;
	const handleDelete = props.handleDelete;
	let date = "";
	if (props.item.date)
		date = new Date(props.item.date).toLocaleString("en-IN");


	return (
		<div className={styles.sessionWrap}>
			<Link to={link} style={{textDecoration: 'none'}}>
				<div className={styles.session}>
					<div>Name: {name}</div>
					<div>Date: {date}</div>
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
