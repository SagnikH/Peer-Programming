import styles from '../../styles/Dashboard.module.css';
import Alert from '../../components/Alert.js';
import Image from 'next/image';

const dashboard = () => {
    const logoutHandler = (e) => {
        window.location.href = "http://localhost:4000/auth/logout";
    }
    return ( 
        <>
        <div className={styles.dashboard}>
            <div className={styles.userInfoSection}>
                <div className={styles.heading}>User Information</div>
                <div className={styles.userContents}>
                    <Image src="/../public/cover.jpeg" alt="Image"  
                        width="200" height="200" className={styles.userImage}>
                    </Image>
                    <div className={styles.userDetails}>
                        <h6>Name:</h6>
                        <h6>Sattam Bandyopadhyay</h6>
                        <h6>Email Id:</h6>
                        <h6> bsattam@gmail.com</h6>
                    </div>
                </div>
                
            </div>
            <div className={styles.sessionsSection}>
                <div className={styles.heading}> Created Sessions </div>
                <div className={styles.contents}>
                    <ul>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.sessionsSection}>
                <div className={styles.heading}> Shared Sessions </div>
                <div className={styles.contents}>
                    <ul>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                        <li> 
                            <div>Time: </div>
                            <div>Link:</div>
                            <a></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className={styles.logoutButton}>
            <Alert alertFunction={logoutHandler}/>
        </div>
        </>
     );
}
 
export default dashboard;

// "http://localhost:4000/auth/logout"