import styles from "../styles/doc.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import SyncedMonacoEditor from "../components/SyncedMonacoEditor";
import ShareIcon from '../components/ShareIcon';
import Error404 from "./Error404";
import Loading from "../components/Loading";
import { config } from "dotenv";
config();

const Doc = () => {
	// const user = useSelector((state) => state.user);
	const { id, did } = useParams();

	const [editorData, setEditorData] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
  	const [question, setQuestion] = useState("");
	const [title, setTitle] = useState("")

	const socket = useOutletContext();

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
				setEditorData(doc.data.savedCode);
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

	const handleTextAreaChange = (e) => {
		setEditorData(e.target.value);
	};

	const handleDocSave = async (e) => {
		e.preventDefault();

		try {
			const savedDoc = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/document/${did}`,
				{ savedCode: editorData },
				{ withCredentials: true }
			);

			console.log("after saving doc ", savedDoc);
		} catch (e) {
			console.log("error in doc", e);
		}
	};

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
						<div className={styles.qHeading}>Question: {title}</div>
						<div style={{width: '50px'}}><ShareIcon link={window.location}/></div>
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