import React from 'react';
import {useSelector} from 'react-redux';
import styles from "../styles/dashboard.module.css";


export default function UserInfo() {

    const user = useSelector((state) => state.user);

    return (
        <div className={styles.section}>
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
    )
}
