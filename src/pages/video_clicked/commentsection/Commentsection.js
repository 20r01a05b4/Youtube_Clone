import { useState,useRef} from "react";
import React from "react";
import "./commentsection.css"
import { IoMdFunnel } from 'react-icons/io';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';


const CommentSection=({subscribe,comment_value})=>{
    const comment_data=comment_value;
    const sub=subscribe;
    const channel=localStorage.getItem("channel")?localStorage.getItem("channel"):null;
    const c1=Boolean(channel)
    const user=sessionStorage.getItem("user")?sessionStorage.getItem("user").split("@")[0]:null;
  
    const [data,setData]=useState("")
    const [holdervalue,setholdervalue]=useState("Add a comment ...")
    const [show,setShow]=useState(false)
    const refer=useRef(null)
    const [area,setArea]=useState("")


    const obj=[
        {
        "letter":"S","time":6,"username":"vinyaka","comment":"this is not correct","likes":100
        },
        {
         "letter":"U","time":16,"username":"shiva","comment":"this is  correct","likes":300
        },
        {
         "letter":"S","time":6,"username":"saikumar","comment":"this is not correct","likes":100
        },
    ]

    const changeHandler=(e)=>{
        setData(e.target.value);
       
    }
   /* const arr=[]
    for(let i=0;i<21;i++){
        arr.push(i);
    }*/

    const clickhandler=(e)=>{
        if(!user){alert("login into account to comment on the video");return;}
        if(!c1){alert("create channel to comment on the video");return;}      
        if((comment_data===" Only Subscribers has to comment  on your videos")&&(!sub)){
            refer.current.style.color="red";
            refer.current.style.fontSize="23px"
            setData("you cannot comment on this video until you subscribe ...!");
            setShow(false)
            return;
        }
        setShow(true)
        if(data.length<=1){
            setholdervalue("Add a comment ...")
        }
        else{
            setholdervalue("")
        }
    }

    const handleTextareaResize = (event) => {
        const textarea = event.target;
        setArea(textarea);
        if(data.length<=10){
            textarea.style.height = '10px'; 
        }
        textarea.style.height = '10px'; 
        textarea.style.height = `${textarea.scrollHeight}px`; 
      };

      const handleCancel=()=>{
            setShow(false)
            if(area){
                area.style.height="15px";
            }
            
            setData("")
      }


    return(
        <div className="commentContanier">

            <div className="commentcount">
                <h3 className="commentdata">167 Comments</h3>  
                <IoMdFunnel size={"30px"} style={{"color":"white"}}></IoMdFunnel>
                <span className="sortby">sort by</span>
            </div>
            <div className="AddCommentContainer" >
                <h2 className="namedisplay">S</h2>
        
                <textarea className="commentInput"type="text"  placeholder={holdervalue}
                        maxLength={5000} onInput={handleTextareaResize} ref={refer}
                        onChange={changeHandler} value={data} onClick={clickhandler}
                 > </textarea>
                
            </div>
            
           
                {show && (
            <div className="cancelcreate">
            <p className="cancelText" style={{ "color": "white", "paddingRight": "50px" }}
            onClick={handleCancel}>Cancel</p>
            <p className="createText" style={{ "color": "white" ,
            "backgroundColor":data.length>=1?"blue":"gray"}}>Comment</p>
            </div>
            )}

        <div className="totalbox">
        {obj.map((val, i) => (
            
  <div key={i} className="userComments">
    <div className="username" style={{"backgroundColor":"seashell"}}>
      <h3>{val["letter"]}</h3>
    </div>
    <div className="commentInfo">
      <p>@{val["username"]} <span>6 hours ago</span></p>
      <div className="othercomment">
        <p>{val["comment"]} {data}</p>
      </div>
      <div className="likereply">
      <FaThumbsUp></FaThumbsUp><span style={{"paddingLeft":"5px"}}>{val["likes"]}</span>
      <FaThumbsDown style={{"marginLeft":"20px"}} ></FaThumbsDown>
      <span style={{"paddingLeft":"30px"}}>reply</span>
    </div>
    </div>
    <br></br>
  </div>
  
        )) }

            
        </div>    
    </div>
    )

}
export default CommentSection;