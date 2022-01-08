import React from 'react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import styles from '../styles/components.module.css';

export default function BackButton() {
    return (
        <BsFillArrowLeftCircleFill
            size='1.4em'
            color='#4c3b4d'
            className={styles.backButton}
        />
    )
}
