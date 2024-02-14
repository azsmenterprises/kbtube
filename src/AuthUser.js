import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const getToken = () =>{
    
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
}






const getUser = () =>{
    
    const userString = sessionStorage.getItem('user');
    const user_details = JSON.parse(userString);
    return user_details;
}


const reactBaseUrl = ()=>{

    return 'http://localhost:3300/';
}

const logOut = () =>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

const checkLogin = () => {
    // const navigate = useNavigate();
    // const tokenString = sessionStorage.getItem('token');
    // const userToken = JSON.parse(tokenString);
    // if(!userToken){
    //     return <Navigate to="/login" replace={true} />;
    // }
}


const https = () =>{
    return axios.create({
    baseURL:'https://shaliniinfo.in',
    headers:{
        "content-type" :"application/json"
    }
    });

}


const authHttps = () =>{
     const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    return axios.create({
    baseURL:'https://shaliniinfo.in',
    headers:{
        "content-type" :"application/json",
        "authorization" : userToken
    }
    });

}

export default function AuthUser(){
    const navigate = useNavigate();



    const  [token,setToken] = useState(getToken());
    const  [user,setUser] = useState(getUser());

    const saveToken = (user,token) => {

        sessionStorage.setItem('token',JSON.stringify(token))
        sessionStorage.setItem('user',JSON.stringify(user))

        setToken(token);
        setUser(user);
        navigate('/dashboard');
       
        
    }

    const http = axios.create({
    baseURL:'https://shaliniinfo.in/',
    headers:{
        "content-type" :"application/json"
    }

    });


    return {
        setToken:saveToken,
        token,
        user,
        http,
        reactBaseUrl,
        authHttps
    }
}

export {getToken,getUser,logOut,https,checkLogin,authHttps}