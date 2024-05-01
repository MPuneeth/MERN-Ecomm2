//import React from "react";
import { useSelector } from "react-redux";
//import {  Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({isAdmin, children}) => {
   const {loading, isAuthenticated, user} = useSelector((state) => state.user);

    const navigate = useNavigate();
// here we have given if not Authenticated i.e., if its false then goto login page
//in LoginSignUp.js we have given in useEffect if Authenticated then goto /account page so
//its in /account page.
    if(loading === false && isAuthenticated === false){
      return navigate("/login")
    }

    if(loading === false && isAdmin === true && user.role !== "admin"){
      return navigate("/login")
    }

      return children;
    };
    
    
  
   

export default ProtectedRoute;
