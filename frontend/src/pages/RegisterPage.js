import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";
import Register from "../components/Register";



const RegisterPage = () => {
    const [token] = useContext(UserContext);
    
    return(
    <>  
        
          {!token ? (
              <Register />
            
          ) : (
            <p>Table</p>
          )}
       
    </>
    )
}

export default RegisterPage;

