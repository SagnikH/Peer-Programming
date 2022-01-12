import React from 'react'
import styles from '../styles/aboutUs.module.css'
import favicon from '../assets/peer.png';
import sattam from '../assets/sattam.jpg';
import ronak from '../assets/ronak.jpg';
import sagnik from '../assets/sagnik.jpg';
import subodh from '../assets/subodh.jpg';

export default function AboutUs() {
    return (
        <div >
            <div className={styles.peer}>
                <div className={styles.peerDesc}>
                    <div className={styles.title}>Code. Chat. Collaborate.</div>
                    <div className={styles.peerDescText}>
                        Presenting Peer-Programming, a one-of-a-kind Video-Conferencing 
                        Enabled Collaborative Code Editor Platform ! Now you can video 
                        chat and collaborate on code simultaneously on the same window, 
                        without any hassle or the requirement of a different software. 
                        Whether it's about brainstorming over a leetcode problem with 
                        peers, practising mock interviews with seniors, or even recording
                        a problem explanation by yourself, Peer-Programming is your go-to 
                        for all your collaborative coding needs !
                    </div>        
                </div>
                <img 
                className={styles.peerImage}
                src={favicon}/>
            </div>
            <div className={styles.contributors}>Contributors</div>
            <div className={styles.person}>
                <div><img
                    className={styles.personImage}
                    src={sagnik}
                /></div>
                <div className={styles.personDesc}>
                    <div className={styles.nameTitle}>Sagnik Halder</div>
                    <div className={styles.shortPersonDesc}>
                        Undergraduate student of Jadavpur University, majoring in 
                        Information Technology. Love to work on Front-end web-technologies. 
                        Hands on experience in Html, Css, Javascript, React, NodeJs,
                        Git, Sql and NoSql Databases. 
                        <br/><br/>
                        Interested in Cloud computing and Blockchain. 
                    </div>
                    <div className='d-flex w-50 justify-content-around'>
                        <a className={styles.btn} 
                        href="https://github.com/SagnikH" 
                        target="_blank">
                            Github
                        </a>
                        <a className={styles.btn} 
                        href="https://www.linkedin.com/in/sagnik-haldar-126b661b0/" 
                        target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.person}>
                <div className={styles.personDesc}>
                    <div className={styles.nameTitle}>Ronak Sanpui</div>
                    <div className={styles.shortPersonDesc}>
                        Undergraduate student of Jadavpur University, majoring in 
                        Information Technology. Love to work on Front-end web-technologies. 
                        Hands on experience in Html, Css, Javascript, React, NodeJs,
                        Git, Sql and NoSql Databases. 
                        <br/><br/>
                        Interested in Cloud computing and Blockchain. 
                    </div>
                    <div className='d-flex w-50 justify-content-around'>
                        <a className={styles.btn} 
                        href="https://github.com/SanpuiRonak" 
                        target="_blank">
                            Github
                        </a>
                        <a className={styles.btn} 
                        href="https://www.linkedin.com/in/ronak-sanpui/" 
                        target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </div>
                <div><img
                    className={styles.personImage}
                    src={ronak}
                /></div>
            </div>
            <div className={styles.person}>
                <div><img
                    className={styles.personImage}
                    src={subodh}
                /></div>
                <div className={styles.personDesc}>
                    <div className={styles.nameTitle}>Subodh Singh</div>
                    <div className={styles.shortPersonDesc}>
                        Undergraduate student of Jadavpur University, majoring in 
                        Information Technology. Love to work on Front-end web-technologies. 
                        Hands on experience in Html, Css, Javascript, React, NodeJs,
                        Git, Sql and NoSql Databases. 
                        <br/><br/>
                        Interested in Cloud computing and Blockchain. 
                    </div>
                    <div className='d-flex w-50 justify-content-around'>
                        <a className={styles.btn} 
                        href="https://github.com/subodh0201" 
                        target="_blank">
                            Github
                        </a>
                        <a className={styles.btn} 
                        href="https://www.linkedin.com/in/subodh-singh-ju/" 
                        target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.person}>
                <div className={styles.personDesc}>
                    <div className={styles.nameTitle}>Sattam Bandyopadhyay</div>
                    <div className={styles.shortPersonDesc}>
                        Undergraduate student of Jadavpur University, majoring in 
                        Information Technology. Love to work on Front-end web-technologies. 
                        Hands on experience in Html, Css, Javascript, React, NodeJs,
                        Git, Sql and NoSql Databases. 
                        <br/><br/>
                        Interested in Cloud computing and Blockchain. 
                    </div>
                    <div className='d-flex w-50 justify-content-around'>
                        <a className={styles.btn} 
                        href="https://github.com/bsattam" 
                        target="_blank">
                            Github
                        </a>
                        <a className={styles.btn} 
                        href="https://www.linkedin.com/in/sattam-bandyopadhyay/" 
                        target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </div>
                <div><img
                    className={styles.personImage}
                    src={sattam}
                /></div>
            </div>
        </div>
    )
}
