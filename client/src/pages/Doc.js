import styles from "../styles/doc.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import SyncedMonacoEditor from "../components/SyncedMonacoEditor";
import ShareIcon from '../components/ShareIcon';
import Error404 from "./Error404";
import Loading from "../components/Loading";
import { config } from "dotenv";
import BackButton from '../components/BackButton.js';
config();

const Doc = () => {
	// const user = useSelector((state) => state.user);
	const { id, did } = useParams();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
  	const [question, setQuestion] = useState("");
	const [title, setTitle] = useState("")

	const socket = useOutletContext();
	const navigate = useNavigate();

	useEffect(() => {
		//fetch curr doc data
		(async () => {
			try {
				const doc = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/api/document/${did}`,
					{
						withCredentials: true,
					}
				);

				console.log("saved code in doc", doc.data);
        		setQuestion(doc.data.question);
				setTitle(doc.data.title);
			} catch (e) {
				console.log(e);
				setError(e.response.status);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const goBackHandler = () => {
		let currentUrl = window.location + "";
		let indexOfDoc = currentUrl.indexOf('/doc/');
		let goToUrl = currentUrl.slice(0, indexOfDoc);
		console.log(goToUrl);
		//navigate(goToUrl);
		window.location = goToUrl;
	}

	if (loading) {
		return <Loading />;
	} else if (error) {
		console.log("error in doc");
		return <Error404 />;
	} else {
		return (
			<div className={styles.docContainer}>
				<div >
					<div className='d-flex justify-content-between align-items-center'>
						<div style={{marginLeft: '20px'}} onClick={goBackHandler}>
							<BackButton/>
						</div>
						<div className={styles.qHeading}>Question: {title}</div>
						<div style={{width: '50px'}}><ShareIcon link={window.location.href}/></div>
					</div>
					
					<div className={styles.question} dangerouslySetInnerHTML={{ __html: question }}></div>
				</div>
				<div className={styles.monacoEditor}>
					<SyncedMonacoEditor socket={socket} docId={did} />
				</div>
			</div>
		);
	}
};

export default Doc;


// <div dangerouslySetInnerHTML={{ __html: lc }}></div>