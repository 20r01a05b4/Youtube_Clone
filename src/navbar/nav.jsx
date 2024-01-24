import React from "react";
import "./nav.css"
import logo from "./logo.png"
import Searchbar from "./search_bar";
import Voice from "./voice";
import Camera from "./camera";
import Bell from "./bell";
import Name from "./name";
import { useState } from "react";
import Signin from "./signin/Signin";
import { useEffect } from "react";
import app from "../backend/Firebase";
import {getAuth,onAuthStateChanged } from "firebase/auth";

const Navbar=()=>{
    const [visible,setVisible]=useState(false)
    const [user,setUser]=useState(false)
    const a=getAuth(app)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(a, (user) => {
          if (user) {
            setUser(true);
          } else {
            sessionStorage.removeItem("user");
            setUser(null);
          }
        });
        return () => unsubscribe();
      }, [a]);
    
      const handleClick = (event) => {
       
        const sidebar = document.querySelector(".sidebar");
        const aside = document.querySelector(".side_container");
        const newVisible = !visible;
        setVisible(newVisible);
        
        if(sidebar){
            sidebar.style.display = newVisible ? "block" : "none";
        }
        if (aside && sidebar) {
          aside.style.display = newVisible ? "none" : "block";
        }
        console.log(aside +"   "+ sidebar)
        if(!sidebar && aside){
            console.log("no sidebar ")
            aside.style.display = newVisible ? "block" : "none";
        }
      
      }; 
    
    
    
    
return(
    <div className="contanier">
        <div className="lines" onClick={handleClick}>
            <div className="bugger">
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
        <div className="logo">
            <img src={logo} alt="yt_image"></img>
            <p className="text">YouTube</p>
        </div>
        <Searchbar></Searchbar>
        <div className="mic">
        <Voice></Voice>
        </div>
        <div className="icons">
        {
            user?(
                <>
                <Camera></Camera>
                <Bell></Bell>
                <Name></Name>
                </>  
            ):(
                <Signin></Signin>
            )
        }
    
        </div>
        
    </div>
)
}
export default Navbar