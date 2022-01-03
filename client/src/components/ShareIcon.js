import React from 'react';
import { BsShareFill } from "react-icons/bs";
import styles from '../styles/components.module.css';

export default function ShareIcon(props) {
    const {size, id} = props;
    const shareHandler = () => {
        alert(id);
    }

    return (
        <BsShareFill 
            size={size} 
            className={styles.shareIcon}
            onClick={shareHandler}
        />
    )
}
