import Image from 'next/image';
import Layout from '../components/Layout'
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import checkAuthToken from "../utils/checkAuthTokenUtil";

const Custom404 = () => {
    const user = useSelector((state) => state.user);

	useEffect(() => {
		//always at the beginning check to see if token exists in LC mainly to handle page refresh and loosing the state

		checkAuthToken(user);

		//TODO: decide whether to redirect in case of token not present
		//probably the token will the there as checkAuthToken mainly handles the loss of state values
	}, []);
    return ( 
        <Layout>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <Image src="/error.svg" width="300" height="300"></Image>
                <h2> Error: Page Not Found!</h2>
                <div>Please check the URL again.</div>
                <div>Sorry for the inconvenience!</div>
            </div>
        </Layout>
        
     );
}
 
export default Custom404;