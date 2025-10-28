import { useState } from "react";
import { createContext } from "react";
import  axios from 'axios'
import { toast } from "react-toastify";
import { useEffect } from "react";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContent = createContext()

export const AppContextProvider = (props)=>{
        
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const [isLoggedin, setIsLoggedin] = useState(false);
        const [userData, setUserData] = useState({});
        
        const getAuthState = async ()=>{
            try {
                const {data} = await axios.get('/api/auth/is-auth')
                 console.log(data);
                if(data.success){
                    setIsLoggedin(true);
                    getUserData();
                    console.log(userData);
                }
                
            } catch (error) {
                toast.error(error.message)
            }
        }

        
        const getUserData = async ()=>{
            try {
                const {data} = await axios.get('/api/user/data')
                if(data.success){
                    setUserData(data.userData);
                }else{
                    toast.success(data.message);
                }
                console.log(userData);
            } catch (error) {
                toast.error(error.message);
            }
        }
         
        useEffect(()=>{
            getAuthState();
        },[])

        const value = {
                backendUrl,
                isLoggedin, 
                setIsLoggedin,
                userData, 
                setUserData,
                axios,
                getUserData
        }


    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}