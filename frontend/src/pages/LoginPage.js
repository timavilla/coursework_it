import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";
import Login from "../components/Login";




const LoginPage = () => {
    const [token] = useContext(UserContext);
    
    return(
    <>  
        
          {!token ? (
           
              
              <Login />
            
          ) : (
            <p>Table</p>
          )}
        
    </>
    )
}

export default LoginPage;