import { IoMdNotificationsOutline } from "react-icons/io";
import React from "react";
import "./bell.css"
const Bell=()=>{
    return(
        <div className="bell_contanier">
            <IoMdNotificationsOutline className="bell_icon" size="25"></IoMdNotificationsOutline>
        </div>
    )
}
export default Bell