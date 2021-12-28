import React from 'react'
import styles from "../styles/dashboard.module.css";

import { BsXCircleFill } from "react-icons/bs"; 

export default function SessionItem(props) {
    const session = props.session;
    const getDate = (date) => {
		return date.slice(5, 15);
	};
    return (
        <div className={styles.sessionWrap}>
            <div className={styles.session}>
                <div>Name: {session.Name}</div>
                <div>Date: {getDate(session.Date)}</div>
                <div>Link: {session.Link}</div>
            </div>
            <BsXCircleFill size="1.5em" color="#4c3b4d"/>
            
            
        </div>
    )
}
