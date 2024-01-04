import "./video.css"
import sai from "./sai.mp4"
import { useState } from "react"
const VideoBox=()=>{
  let a=[]
  const handleVideoClick = () => {
    console.log("The video is clicked!");
  };

  for(let i=0;i<21;i++){
    a.push(i+1)
  }
 const [limit,setLimit]=useState(6)
 const increaseLimit=()=>{
  setLimit(21)
 }
 const decreaseLimit=()=>{
  setLimit(6)
 }

return(
  <div className="video_contanier"> 
    <div className="inner_contanier"> 
        {a.slice(0,limit).map((_, index) => (
          <div key={index} className="box">
             <video controls width="100%" height="70%"  src={sai} style={{borderRadius:"7px"}} onClick={handleVideoClick}>
          </video>        
        <h3 style={{color:"white"}}>description about the video should display {index}</h3>
          </div> 
        ))}
        {limit<=6 && <button className="show" onClick={increaseLimit}><h3>showmore</h3></button>}
        {limit>6 && <button className="showless" onClick={decreaseLimit}>showless</button>}
    </div>
  </div>
)
}
export default VideoBox 