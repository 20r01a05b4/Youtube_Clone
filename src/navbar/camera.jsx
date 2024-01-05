import React from 'react';
import { MdPhotoCameraFront } from "react-icons/md";
import { useState } from 'react';
import "./camera.css"
import { useNavigate } from 'react-router-dom';
import { onValue,ref,getDatabase } from 'firebase/database';
import app from '../backend/Firebase';

const Camera=()=>{
const realdb=getDatabase(app);
const navi=useNavigate();
//const [channel,setChannel]=useState(false)
const [show,setShow]=useState(false)

const handleCamera=(e)=>{
    e.preventDefault();
    setShow(true);
}

/*channel present or not */
const verifyingChannel=async()=>{
    
    const name=localStorage.getItem("user").split("@")[0]
    const refer=ref(realdb,name+"t/channel");
    onValue(refer,(snapshot)=>{
        const data=snapshot.val();
        if(data){
            navi("uploadvideo")
            console.log("channel avaliable"+ data);
        }
        else{
            navi("/channel")
            console.log("channel not created")
        }
    })
}

const handleUpload=(e)=>{
    e.preventDefault();
    verifyingChannel();
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
                    <div className='live_text' onClick={handleLive}>Go Live</div>
                </div>
            
           </div>    
        )
    }
  </>
)

}
export default Camera