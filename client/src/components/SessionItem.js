import React, {useState} from 'react';
import { Link } from "react-router-dom";
import styles from "../styles/dashboard.module.css";
import WarningModal from "./WarningModal";

import { BsXCircleFill } from "react-icons/bs";

export default function SessionItem(props) {
	const [showModal, setShowModal] = useState(false);
 	const name = props.item.name;
	const link = props.item.link;
	const id = props.item.id;
	const handleDelete = props.handleDelete;
	const modalMsg="Are you sure you want to delete this session?"
	let date = "";
	if (props.item.date)
		date = new Date(props.item.date).toLocaleString("en-IN");


	return (
		<div className={styles.sessionWrap}>
			<WarningModal 
				showModal={showModal} 
				setShowModal={setShowModal} 
				handleDelete={handleDelete} 
				message={modalMsg} 
				id={id}
			/>
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
				onClick={() => setShowModal(true)}
			/>
		</div>
	);
}
