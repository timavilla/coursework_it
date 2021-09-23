import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios'
import { UserContext } from "./UserContext";

export const AdminContext = createContext()

export const AdminProvider = (props) => {

    const [token] = useContext(UserContext);
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        let axiosConfig = {
            headers: {Authorization: `Bearer ${token}`}
        }
        
        async function isAdmin() {
            const res = await axios.get('http://localhost:8000/users/me', axiosConfig)
            setAdmin(res.data.admin)
            console.log(res.data)
        }
        isAdmin()
        
        
    }, [admin])
    return (
        <AdminContext.Provider value={[admin, setAdmin]}>
          {props.children}
        </AdminContext.Provider> 
    )
}
