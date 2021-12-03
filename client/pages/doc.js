import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import styles from '../styles/Doc.module.css';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import checkAuthToken from "../utils/checkAuthTokenUtil";

const doc = () => {
    const user = useSelector((state) => state.user);

	useEffect(() => {
		//always at the beginning check to see if token exists in LC mainly to handle page refresh and loosing the state

		checkAuthToken(user);

		//TODO: decide whether to redirect in case of token not present
		//probably the token will the there as checkAuthToken mainly handles the loss of state values
	}, []);
    
    const lc = '<div class="content__u3I1 question-content__JfgR"><div><p>Given the <code>root</code> of a binary search tree, return <em>a <strong>balanced</strong> binary search tree with the same node values</em>. If there is more than one answer, return <strong>any of them</strong>.</p>\n' +
    '\n' +
    '<p>A binary search tree is <strong>balanced</strong> if the depth of the two subtrees of every node never differs by more than <code>1</code>.</p>\n' +
    '\n' +
    '<p>&nbsp;</p>\n' +
    '<p><strong>Example 1:</strong></p>\n' +
    '<img alt="" src="https://assets.leetcode.com/uploads/2021/08/10/balance1-tree.jpg" style="width: 500px; height: 319px;">\n' +
    '<pre><strong>Input:</strong> root = [1,null,2,null,3,null,4,null,null]\n' +
    '<strong>Output:</strong> [2,1,3,null,null,null,4]\n' +
    '<b>Explanation:</b> This is not the only correct answer, [3,1,4,null,2] is also correct.\n' +
    '</pre>\n' +
    '\n' +
    '<p><strong>Example 2:</strong></p>\n' +
    '<img alt="" src="https://assets.leetcode.com/uploads/2021/08/10/balanced2-tree.jpg" style="width: 224px; height: 145px;">\n' +
    '<pre><strong>Input:</strong> root = [2,1,3]\n' +
    '<strong>Output:</strong> [2,1,3]\n' +
    '</pre>\n' +
    '\n' +
    '<p>&nbsp;</p>\n' +
    '<p><strong>Constraints:</strong></p>\n' +
    '\n' +
    '<ul>\n' +
    '\t<li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>\n' +
    '\t<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n' +
    '</ul>\n' +
    '</div></div>';
    const reactLc = ReactHtmlParser(lc);
    console.log(reactLc[0].props.children);
    return ( 
        <div className={styles.docContainer}>
            <div className={styles.question}>
                <div
                dangerouslySetInnerHTML={{__html: lc}}>
                </div>
            </div>
            <div className={styles.block}>

            </div>
        </div>
     );
}
 
export default doc;

/**
 * 

*/