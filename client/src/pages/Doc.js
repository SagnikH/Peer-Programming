import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from "react-html-parser";
import styles from "../styles/doc.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import SyncedMonacoEditor from "../components/SyncedMonacoEditor";

import Error404 from "./Error404";
import Loading from "../components/Loading";
import { config } from "dotenv";
config();

const Doc = () => {
	// const user = useSelector((state) => state.user);
	const { id, did } = useParams();

	const [documentData, setDocumentData] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

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
				setDocumentData(doc.data.savedCode);
			} catch (e) {
				console.log(e);
				setError(e.response.status);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const handleTextAreaChange = (e) => {
		setDocumentData(e.target.value);
	};

	const handleDocSave = async (e) => {
		e.preventDefault();

		try {
			const savedDoc = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/document/${did}`,
				{ savedCode: documentData },
				{ withCredentials: true }
			);

			console.log("after saving doc ", savedDoc);
		} catch (e) {
			console.log("error in doc", e);
		}
	};

	const lc =
		'<div class="content__u3I1 question-content__JfgR"><div><p>Given the <code>root</code> of a binary search tree, return <em>a <strong>balanced</strong> binary search tree with the same node values</em>. If there is more than one answer, return <strong>any of them</strong>.</p>\n' +
		"\n" +
		"<p>A binary search tree is <strong>balanced</strong> if the depth of the two subtrees of every node never differs by more than <code>1</code>.</p>\n" +
		"\n" +
		"<p>&nbsp;</p>\n" +
		"<p><strong>Example 1:</strong></p>\n" +
		'<img alt="" src="https://assets.leetcode.com/uploads/2021/08/10/balance1-tree.jpg" style="width: 500px; height: 319px;">\n' +
		"<pre><strong>Input:</strong> root = [1,null,2,null,3,null,4,null,null]\n" +
		"<strong>Output:</strong> [2,1,3,null,null,null,4]\n" +
		"<b>Explanation:</b> This is not the only correct answer, [3,1,4,null,2] is also correct.\n" +
		"</pre>\n" +
		"\n" +
		"<p><strong>Example 2:</strong></p>\n" +
		'<img alt="" src="https://assets.leetcode.com/uploads/2021/08/10/balanced2-tree.jpg" style="width: 224px; height: 145px;">\n' +
		"<pre><strong>Input:</strong> root = [2,1,3]\n" +
		"<strong>Output:</strong> [2,1,3]\n" +
		"</pre>\n" +
		"\n" +
		"<p>&nbsp;</p>\n" +
		"<p><strong>Constraints:</strong></p>\n" +
		"\n" +
		"<ul>\n" +
		"\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n" +
		"\t<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n" +
		"</ul>\n" +
		"</div></div>";
	const reactLc = ReactHtmlParser(lc);
	// console.log(reactLc[0].props.children);

	if (loading) {
		return <Loading />;
	} else if (error) {
		console.log("error in doc");
		return <Error404 />;
	} else {
		return (
			<div className={styles.docContainer}>
				<div className={styles.question}>
					<div dangerouslySetInnerHTML={{ __html: lc }}></div>
				</div>
				<div className={styles.question}>
					<SyncedMonacoEditor socket={socket} docId={did} />
				</div>
				{/* <div className={styles.block}></div> */}
			</div>
		);
	}
};

export default Doc;
