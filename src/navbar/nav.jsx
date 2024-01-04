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
const Navbar=()=>{
    const [visible,setVisible]=useState(false)
    //const [user,setUser]=useState(false)
    const user=localStorage.getItem("user")
    const handleClick = (event) => {
        const sidebar = document.querySelector(".sidebar");
        const aside = document.querySelector(".side_contanier");
        const newVisible = !visible;
        setVisible(newVisible);
        sidebar.style.display = newVisible ? "block" : "none";
        
        if (aside) {
            aside.style.display = newVisible ? "none" : "block";
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