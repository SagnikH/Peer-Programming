import Layout from '../components/Layout'
import {useSelector} from 'react-redux';
import {useEffect} from 'react'; 
import { checkAuth } from "../utils/checkAuth";
import errorsvg from '../assets/error.svg';

const Error404 = () => {
    const user = useSelector((state) => state.user);

	useEffect(() => {
		//always at the beginning check to see if token exists in LC mainly to handle page refresh and loosing the state

		checkAuth(user);

		//TODO: decide whether to redirect in case of token not present
		//probably the token will the there as checkAuth mainly handles the loss of state values
	}, []);
    return ( 
        <>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <img src={errorsvg} width="300" height="300"></img>
                <h2> Error: Page Not Found!</h2>
                <div>Please check the URL again.</div>
                <div>Sorry for the inconvenience!</div>
            </div>
        </>
        
     );
}
 
export default Error404;