import "./upload.css";
import React from "react";
import { MdClose, MdFileUpload } from "react-icons/md";
import { useRef, useState } from "react";
import { getStorage,  ref as re, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from "../../backend/Firebase";
import { useNavigate } from 'react-router-dom';
import {ref as r,getDatabase, set, onValue } from 'firebase/database';
import { v4 } from "uuid";

const Upload = () => {
  const user = sessionStorage.getItem("user").split("@")[0];
  
  //console.log(user)
  const fileInputRef = useRef(null);
  const [video, setVideo] = useState(null);
  const navi = useNavigate();
  const [comment,setComment]=useState("");
  const [access,setAccess]=useState("");
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  

  /*input references */
  const titleref=useRef(null);
  const descref=useRef(null);
  const videoref=useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file)
    }

  };

  const handleFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const logoClickHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    navi(-1)
  };

  /* video information has to store in the realtime database */
  const videoInformation = async (url) => {
    const db = getDatabase(app);
    const user = sessionStorage.getItem("user").split("@")[0];
    const refer = r(db, `videos`);
    let snap = [];
  
    // Fetch the current snapshot of data
    await new Promise((resolve) => {
      onValue(refer, (snapshot) => {
        const value = snapshot.val();
        if (value) {
          snap = value;
        }
        resolve();
      });
    });
  
    let channel = {};
    
    await new Promise((resolve) => {
      onValue(r(db, `${user}/channel`), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          channel = data;
        }
        resolve();
      });
    });
  
    // Add the new video object to the array
    const newVideoObject = {
      id: v4(),
      title: title,
      description: desc,
      access: access,
      comment: comment,
      handler_name: user,
      date: new Date(),
      url: url,
      channel: channel,
    };
  
    snap.push(newVideoObject);
  
    await set(refer, snap);
  
    alert("Video uploaded successfully");
    navi("/")
  };
  

  /* form validation */
  const formValidation=()=>{
    if(title===""){
      alert("title should not be null")
      titleref.current.focus();
      return false;
    }
    if(desc===""){
      alert("description should not be null")
      descref.current.focus();
      return false;
    }
    if(video===null){
      alert("upload a image")
      videoref.current.focus();
      return false;
    }
    return true;
  } 

    /* handle upload function */
  const handleUpload = async (e) => {
    console.log("button clicked")
    const error=formValidation();
    if(!error){
      return;
    }
    try {
      const storageRef = re(getStorage(app), `videos/${user}/${video.name}`);
      const snapshot = await uploadBytes(storageRef, video);
      const downloadURL = await getDownloadURL(snapshot.ref);
      videoInformation(downloadURL);
      
    } catch (error) {
      console.error('Error during upload:', error);
    }
   
  };

  const handleTitle=(e)=>{
      e.target.style.border="rgb(28,28,28)"
 
  }

  /*handle the comment check box */
  const handleCheckboxComment=(e)=>{
      setComment(e.target.value);
    
  }

   /*handle the accessbility check box */
   const handleCheckboxAccess=(e)=>{
    setAccess(e.target.value);

}


  return (
    <div className="upload_outercontanier" >
      <div className="upload_innercontanier">
        <div className="uploadTopContanier">
              <div className="uploadheading">
                <h3>Upload video</h3>
              </div>
              <div className="wrong">
                <h3>
                  <MdClose size={"32px"}></MdClose>
                </h3>
              </div>
        </div>
        <div className="drag_contanier">
            <div className="drag_drop"></div>
                <div className="logo_contanier" onClick={logoClickHandler}>
                  {video ? (
                    <img src={video} alt="Video Thumbnail" capture="camcorder" ref={videoref} style={{ width: "100px", height: "100px" }} />
                  ) : (
                    <MdFileUpload size={"100px"}></MdFileUpload>
                  )}
                </div>
            <div>
              <h2 style={{ "color": "black" }}>Drag and drop video files to upload</h2>
            
            </div>
            <button className="select_file_btn" onClick={handleFileInput}>
              SELECT FILES
           </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              style={{ "display": "none" }}
              required
              onChange={handleFileInputChange} 
            />
        </div><br></br>
        <h3 style={{"marginLeft":"50px"}}>Title :</h3>
        <div className="title_contanier"> 
             <label className="title_label">Title(requried)</label>
             <textarea type="text" max-length={100} required className="title_input" ref={titleref} onClick={handleTitle} onChange={(e)=>{setTitle(e.target.value)}} value={title}></textarea>
        </div><br></br>
       <h3 style={{"marginLeft":"50px"}}>Description :</h3>
        <div className="description_contanier">  
          
          <label className="description_label">Description(requried)</label>
          <textarea required  maxLength={5000} className="description_input" ref={descref} onChange={(e)=>{setDesc(e.target.value)}} value={desc}></textarea>
        </div><br></br>
        <br></br>


        <div className="access_controler">
          <p style={{"fontSize":"22px"}}>  Choose who has to view your videos:</p>
             <label style={{"paddingTop":"5px"}}>
                <input
                  type="radio"
                  name="access"
                  onChange={handleCheckboxAccess}
                  value="Only Subscribers has to view the videos"
                />
                Only Subscribers has to view the videos
            </label>

            <label style={{"paddingTop":"5px"}}>
              <input
                type="radio"
                name="access"
                onChange={handleCheckboxAccess}
                value="Any User can view the videos"
              />
               Any User can view the videos
            </label>
        </div><br></br><br></br>
        

        <div className="access_controler">
          <p style={{"fontSize":"22px"}}>  Choose who has to comment on your videos:</p>
             <label style={{"paddingTop":"5px"}}>
                <input
                  type="radio"
                  name="comment"
                  
                  onChange={handleCheckboxComment}
                  value=" Only Subscribers has to comment  on your videos"
                />
                Only Subscribers has to comment  on your videos
            </label>

            <label style={{"paddingTop":"5px"}}>
              <input
                type="radio"
                name="comment"
                onChange={handleCheckboxComment}
                value=" Any User can comment on your videos"
              />
               Any User can comment on your videos
            </label>
        </div><br></br><br></br>

            <div className="create_cancel">
                <p style={{"backgroundColor":"red","borderRadius":"3px","alignItems":"center","padding":"8px 8px"}} onClick={handleCancel}>Cancel</p>
                <p style={{"backgroundColor":"green","borderRadius":"3px","alignItems":"center","padding":"8px 8px"}} onClick={handleUpload}>Upload</p>
            </div>
      </div>
    </div>
  );
};

export default Upload;
