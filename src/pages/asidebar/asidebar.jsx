import { FaHome } from 'react-icons/fa';
import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { SiYoutubeshorts } from "react-icons/si";
import { BsCollectionPlay } from "react-icons/bs";
import "./asidebar.css"

const Asidebar=()=>{
    return(
    <aside className="side_contanier">
    <div className="home">
        <div className="inside_home" >
            <FaHome className="icon" size="30px"></FaHome>
            <p className="home_name">Home</p>
        </div>
    </div>
    <div className="shorts">
        <div>
        <FaPlay className="icon" size="30px"></FaPlay>
        <p>Shorts</p>
        </div>
    </div>
    <div className="subscription">
        <div>
        <SiYoutubeshorts className="icon" size="30px"></SiYoutubeshorts>
        <p>subscription</p>
        </div>
    </div>
    <div className="you">
        <div>
        <BsCollectionPlay className="icon" size="30px"></BsCollectionPlay>
        <p>you</p>
        </div>
    </div>
</aside>
    )
}

export default Asidebar