import "./voice.css"
import React from "react";
import { FaMicrophone } from 'react-icons/fa';
const Voice=()=>{
    return(
        <div className="voice-contanier">
            <FaMicrophone className="voice_icon"></FaMicrophone>
        </div>
    )
}
export default Voice