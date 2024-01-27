import React from "react";
import "./name.css"
import app from "../backend/Firebase";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Name=()=>{
    const name=sessionStorage.getItem("user").slice(0,1)
    const auth=getAuth(app)
    const navigate=useNavigate();
    
    const handleLogout=async(e)=>{
        e.preventDefault()
        console.log("i want logout")
        
        alert("logout")
        await signOut(auth)
        navigate("/")

    }
    return(
            <div className="name_contanier" onClick={handleLogout} > 
                <h3 className="name_logo">{name}</h3>
            </div>

    )
}
export default Name