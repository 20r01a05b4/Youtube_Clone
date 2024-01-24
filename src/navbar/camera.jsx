import React from 'react';
import { MdPhotoCameraFront } from 'react-icons/md';
import { useState } from 'react';
import './camera.css';
import { useNavigate } from 'react-router-dom';
import { onValue, ref, getDatabase } from 'firebase/database';
import app from '../backend/Firebase';
//import Upload from '../Upload_video/Upload/Upload';
//import Channel from '../Upload_video/create_channel/Channel';
import { useRef } from 'react';
import { useEffect } from 'react';

const Camera = () => {

  const realdb = getDatabase(app);
  const navi = useNavigate();
  const [show, setShow] = useState(false);
  const [channelAvaliable, setChannelAvaliable] = useState(false);
  const [visible,setVisible]=useState(false)
  sessionStorage.setItem("visible",false);
  
  const refer=useRef(null);

  const handleCamera = (e) => {
    setShow(true);
    e.preventDefault();
  };

  /*channel present or not */
  const verifyingChannel = async () => {
    const name = sessionStorage.getItem('user').split('@')[0];
    const refer = ref(realdb, name + '/channel');
    await new Promise((resolve)=>{
      onValue(refer, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          setChannelAvaliable(true);
          sessionStorage.setItem("channelAvaliable",true)
          navi("/uploadvideo")
         // console.log('channel available', data);
        } else {
          sessionStorage.setItem("channelAvaliable",false);   
          setChannelAvaliable(false);
          navi("/createchannel")
          //console.log('channel not created');
        }
        resolve()
      });
    })
    
  };

  const handleUpload = (e) => {
    e.preventDefault();
    verifyingChannel();
    sessionStorage.setItem("visible",true);
    setVisible(true)
    console.log(channelAvaliable,visible)
   
  };
  const outsideClick=(e)=>{
    if (refer.current && !refer.current.contains(e.target)) {
      setShow(false)
    }
  }
  
  useEffect(() => {
   
    document.addEventListener('mousedown', outsideClick);

    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, []);

  const handleLive = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="camera_contanier">
        <MdPhotoCameraFront className="camera_logo" size="25px" onClick={handleCamera} />
      </div>
      {show && (
        <div className="upload_dropdown">
          <div className="inner_dropdown">
            <div className="upload_text" onClick={handleUpload} ref={refer}>
              Upload video
            </div>
            <div className="live_text" onClick={handleLive}>
              Go Live
            </div>
          </div>
        </div>
      )}
    </>
  ); 
};

export default Camera;
