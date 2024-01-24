import "./videoclicked.css"
import React from "react";
import Navbar from "../../navbar/nav"
import Asidebar from "../asidebar/asidebar";
import { useParams } from 'react-router-dom';
import LikesandDislikes from "./likesanddislikes/likesanddislikes";
import FullDesc from "./fulldescription/FullDesc";
import CommentSection from "./commentsection/Commentsection";
import ParallelVideos from "./parallelvideos/parallelvideos";
import { useLocation } from "react-router-dom";
import app from "../../backend/Firebase";
import { getDatabase,ref,onValue } from "firebase/database";
import { useEffect,useState} from "react";


const VideoClicked=(props)=>{
    const {videoId}=useParams();
    const { state } = useLocation();
  
    const [sub,setSub]=useState(false);
    const video=(state["video"])
    const db = getDatabase(app);
    const info=sessionStorage.getItem("user")?sessionStorage.getItem("user").split("@")[0]:null;
    const refer = ref(db, `subscribersdata/${video["handler_name"]}/subscribers/${info}`);
    useEffect(() => {
      const unsubscribe = onValue(refer, (snapshot) => {
        const data = snapshot.val();
        if(data){
            setSub(true);
        }
        else{
            setSub(false)
        }
        
      });
  
      // Cleanup function
      return () => unsubscribe();
    }, [refer]);
  
    return(
        <>
        <Navbar></Navbar>
        <Asidebar></Asidebar>
        <div className="Videoclicked_container">
            <div className="videodetailspart">
                <div className="maxvideocontainer">
                    <video controls width="98%" height="90%" className="videocontroler"
                    style={{"borderRadius":"10px","backgroundColor":"red"
                            }} src={video["url"]} alt={"A video"}></video>
                    
                    <h2 className="titleDisplay">{video["title"]}</h2>
                    <LikesandDislikes id={videoId} info={video} subscribe={sub} user={info}></LikesandDislikes>
                    <FullDesc></FullDesc>
                    <CommentSection  subscribe={sub} comment={video["comment"]}></CommentSection>          
        
                </div>
            </div>
            <div className="showmorevideos">
                
                <ParallelVideos video_info={state}></ParallelVideos>
                <h1>more videos has to show</h1>
            </div>
        </div>
        
        </>

    )
}

export default VideoClicked