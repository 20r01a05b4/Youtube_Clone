import React from 'react';
import { MdPhotoCameraFront } from "react-icons/md";
import { useState } from 'react';
import "./camera.css"
import { useNavigate } from 'react-router-dom';


const Camera=()=>{

const navi=useNavigate();
//const [channel,setChannel]=useState(false)
const [show,setShow]=useState(false)

const handleCamera=(e)=>{
    e.preventDefault();
    setShow(true);
}


const handleUpload=(e)=>{
    e.preventDefault();
    navi("/createchannel")
}
const handleLive=(e)=>{
    e.preventDefault();
}
return(
    <>
    <div className="camera_contanier">    
    <MdPhotoCameraFront className="camera_logo" size="25px" onClick={handleCamera}></MdPhotoCameraFront>       
    </div>
    {   
        (show)&&(
            <div className="upload_dropdown">
                <div className="inner_dropdown">
                    <div className='upload_text' onClick={handleUpload}>Upload video</div>
                    <div className='live_text' clcik={handleLive}>Go Live</div>
                </div>
            
           </div>    
        )
    }
  </>
)

}
export default Camera