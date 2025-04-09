import axios from "axios";
import { useState,createContext, useEffect } from "react";
const AuthContext=createContext(null)
export const AuthProvider=({children})=>{
    const [user,setAuth]=useState(null);
    const fetchUser=async()=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/current_user`,{withCredentials:true});
            setAuth(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }
    useEffect(()=>{
        fetchUser();

    },[])
    return(
        <AuthContext.Provider value={{user,refreshUser: fetchUser}}>
        {children}
        </AuthContext.Provider>
        
    )
}
export default AuthContext