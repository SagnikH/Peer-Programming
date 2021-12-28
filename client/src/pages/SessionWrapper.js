import React, {useEffect} from 'react';
import styles from '../styles/sessionWrapper.module.css';
import { Outlet } from 'react-router-dom';


export default function SessionWrapper() {
    useEffect(()=>{
        console.log("re-rendered");
        return (()=>{
            console.log("unmounted");
        })
    }, [])
    return (
        <div className="d-flex">
            <div className={styles.main}>
                <Outlet/>
            </div>
            <div className={styles.videocall}>

            </div>
        </div>
    )
}
