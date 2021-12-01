import { useEffect } from "react";
import checkAuthToken from "../utils/checkAuthTokenUtil";

const signin = () => {
  //checks to see if we have user token in the local storage
  useEffect(()=> {
    checkAuthToken();
  }, [])

    return ( 
        <div>
            This is just a dummy page, created to check whether the 
            initial redux store is working properly or not
        </div>
     );
}
 
export default signin;