import React, { useState } from "react";
import { BsShareFill } from "react-icons/bs";
import MessageModal from "./MessageModal.js";
import styles from "../styles/components.module.css";

export default function ShareIcon(props) {
	const { size, link } = props;
	const [showModal, setShowModal] = useState(false);
	const message = `The link was successfully copied. 
        Share the link to your peers! Happy collaborative 
        programming.`;

	const shareHandler = async () => {
    // console.log(link);
		let URL = link;
		if (URL) {
			if (!URL.startsWith("https://")) {
				URL = "https://".concat(link);
			}
		}
		await navigator.clipboard.writeText(URL);
		setShowModal(true);
	};

	return (
		<>
			<MessageModal
				title="Successfully copied!"
				message={message}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
			<BsShareFill
				size={size}
				className={styles.shareIcon}
				onClick={shareHandler}
			/>
		</>
	);
}
