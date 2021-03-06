import React, {useState} from 'react';
import { Link } from "react-router-dom";
import styles from "../styles/dashboard.module.css";
import WarningModal from "./WarningModal";
import ShareIcon from "./ShareIcon";

import { BsXCircle } from "react-icons/bs";

export default function SessionItem(props) {
	const [showModal, setShowModal] = useState(false);
 	const name = props.item.name;
	const link = props.item.link;
	const sharedLink = window.location.host + link;
	const id = props.item.id;
	const handleDelete = props.handleDelete;
	const modalMsg="Are you sure you want to delete this? This action cannot be undone."
	let date = "";
	if (props.item.date)
		date = new Date(props.item.date).toLocaleString("en-IN");

	return (
		<div className={styles.sessionWrap}>
			<WarningModal 
				showModal={showModal} 
				setShowModal={setShowModal} 
				handlePositive={handleDelete} 
				message={modalMsg} 
				id={id}
			/>
			
			<Link to={link} style={{textDecoration: 'none'}}>
				<div className={styles.session}>
					<div>Name: {name}</div>
					<div>Date: {date}</div>
					<div>Id: {id}</div>
				</div>
			</Link>
			<div className='d-flex flex-column'>
				<BsXCircle
					size="1.3em"
					className={styles.deleteIcon}
					onClick={() => setShowModal(true)}
				/>
				<ShareIcon size='1.1em' link={sharedLink}/>
			</div>
		</div>
	);
}
