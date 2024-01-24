import "./likesanddislikes.css"
import React, { useState} from 'react';
import { FaThumbsUp, FaThumbsDown, FaShare,FaEllipsisH } from 'react-icons/fa';
import app from "../../../backend/Firebase";
import { getDatabase,onValue,ref,remove,set } from "firebase/database";
import { useNavigate } from "react-router-dom";


const lightGray = 'rgb(200, 200, 200)';

const LikesandDislikes = ({info,subscribe,user}) => {
  const data=info;
  
  const navi=useNavigate();
  
  const [liked, setLiked] = useState(0);
  const [disliked, setDisliked] = useState(0);
  const [subscribed,setSubscribed]=useState([])
  const [infor,setInfor]=useState([])
  const name=user
  const channel=localStorage.getItem("channel")?localStorage.getItem("channel"):null;
  const db=getDatabase(app);
  const c1=Boolean(channel)


  const handleLike = () => {
    setLiked(!liked);
    alert("login into your account to like")
   
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    alert("login into your account to dislike")
   
  };


  const handleShare = () => {
    if(!user){
      alert("login into your account to share")
    }
   
  };

  const handleOptions = () => {
    
  };


  const SubscribersData=async(data)=>{
        const value=data;
        const user=value.handler_name;
          
          const ref1=ref(db,"subscribersdata/"+user+"/subscribers/"+name)
        
          
          await new Promise((resolve)=>{
            onValue(ref1,(snapshot)=>{
                const val=snapshot.val();
                if(val){
                  setSubscribed(val);
                }
                else{
                  setSubscribed([])
                }
                resolve()
            })

          })
          

          let c=[];
          await new Promise((resolve)=>{
            onValue(ref(db,name+"/channel"),(snapshot)=>{ 
                const val=snapshot.val();
                if(val){
                  c=val;
                }
            
                resolve()
            })

          })
          
         
          const obj={
           "channel_name":c["channel_name"],"handler_name":c["handler_name"],time:new Date().toISOString()
          }
          console.log(subscribed)
          const arr=subscribed
          setSubscribed(arr.push(obj));
          
          await set(ref1,subscribed);


          const ref2=ref(db,"subscribersdata/"+name+"/subscribed/"+user);
       
          /*whom user subscribed */

          await new Promise((resolve)=>{
            
            onValue(ref2,(snapshot)=>{ 
                const val=snapshot.val();
                if(val){
                  setInfor(val);
                }
                else{
                  setInfor([])
                }
                resolve()
            })

          })
          const d=value["channel"]
          const channel_name=(d["channel_name"])
          const obj2={
            "channel_name":channel_name,"handler_name":d["handler_name"],time:new Date().toISOString()
          }
          const arr1=infor;
          arr1.push(obj2)
          setInfor(arr1);
         
          await set(ref2,infor)

  }


  /*the one who subscribed your channel */
  const Subscribers=async()=>{
    
     SubscribersData(data);
  }

  /*unsubscribe function */
  const Unsubscribe=async()=>{
     const video_user=data["handler_name"];
     const ref1=ref(db,"subscribersdata/"+video_user+"/subscribers/"+name)
     const ref2=ref(db,"subscribersdata/"+name+"/subscribers/"+video_user);
     await remove(ref1).then((dlt)=>{console.log("deleted1")}).catch((err)=>{console.log(err)})
     await remove(ref2).then((dlt)=>{console.log("deleted2")}).catch((err)=>{console.log(err)})
     subscribe=false;
    
  }

  const handleSubscribe=(e)=>{
    e.preventDefault();
    if(!user){
      alert("login into the account to subscribe");return;
    }
    if(!c1){
      alert("create  a channel to subscribe");
      navi("/createchannel")
      return;

    }
    if(user && c1){
    if(subscribe){
      Unsubscribe();
     
      return;
    }
    Subscribers();
  }
 
    
  }

  const optionStyle = {
    color: lightGray,
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '-0.5px', 
  };

  return (
    <div className="video-options" style={optionStyle}>
      <div className="channellogo">
        <p>S</p>
      </div>
      <div className="channelname">
        <div className="channelpagename" style={{"fontSize":"20px"
    ,"paddingBottom":"3px"}}>channelpage</div>
        <div  className="subscribers" style={{"fontSize":"14px"}}>3000 Subscribers</div>
      </div>

      <div className="subscribebutton" style={{"backgroundColor":subscribe?"blue":"grey"}} onClick={handleSubscribe}>{subscribe?"UnSubscribed":"Subscribe"}</div>
      <div className="likeanddislike">
        <div className={`option ${liked ? 'active' : ''}`} onClick={handleLike}
        style={{ "borderRight":"3px solid white"}}>
            <FaThumbsUp  size={"20px"} style={{"marginRight":"5px"}}/>
            <span style={{"marginRight":"8px","fontSize":"18px"
            }}>3.4k</span>
        </div>
        <div className={`option ${disliked ? 'active' : ''}`} onClick={handleDislike}>
            <FaThumbsDown size={"20px"} style={{"marginLeft":"8px"}}/>
        
      </div>
        
      </div>

      <div className="optionshare" onClick={handleShare}>
        <FaShare size={"20px"} />
        <span style={{ "marginLeft": '3px',"fontSize":"18px" }}>Share</span>
      </div>

      <div className="moreoptions" onClick={handleOptions}>
        <FaEllipsisH size={"20px"}/>
      </div>
    </div>
  );
};


export default LikesandDislikes