import React from 'react';
import SessionItem from './SessionItem';
import styles from "../styles/dashboard.module.css";

export default function SessionList(props) {
    const sessions = props.sessions;
    const title = props.title;
    return (
        <div className={styles.section}>
            <div className={styles.heading}> {title} </div>
            <div className={styles.contents}>
                <div>
                    {sessions.map((session) => {
                        return (
                            <SessionItem session={session} key={Math.random()}/>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
