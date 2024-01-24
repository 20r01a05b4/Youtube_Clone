import "./videos.css";
import React from "react";
//import videos from "./video.mp4";
import { FaCheck } from 'react-icons/fa';
import { Link} from "react-router-dom";
import { useRef } from "react";

const ParallelVideos = ({video_info}) => {
  const information=video_info;
  const arr=[]
  for(let i=0;i<10;i++){
    arr.push(information["video"])
  }

  //const history = useNavigate();
  const refer = useRef(null);
  

  const handleClick = (e, videoId) => {
    e.preventDefault();
    refer.current.click()
  
  };

 
  return (
    <div className="AllVideos">
    
      {arr.map((val, i) => (
        <div className="flex_box" style={{ "marginBottom": "3px" }} key={i}>
          <div style={{ "display": "flex", "width": "maxContent" }} className="innerVideo">
            <video
              id={i}
              src={val["url"]}
              width="350px"
              style={{ "marginRight": "70px", "borderRadius": "10px", "cursor": "pointer" }}
              height="130px"
              onClick={(e) => handleClick(e, i)}
            ></video>
            <Link ref={refer} style={{ "display": "none" }} to={`/videoclicked/${i}`} state={{video: val}}>click here</Link>
          </div>
          <div className="videoinfo">
            <p style={{ "color": "white" }}>this is the description of a video should be dynamic</p>
            <p>
              channelname{" "}
              <span style={{
                "width": "50px", "height": "50px", "borderRadius": "50%", "backgroundColor": "gray"
              }}>
                <FaCheck size={11} color="white" alt="Check Icon"></FaCheck>
              </span>
            </p>
            <p>266k views</p>
            <span style={{ "color": "grey" }}>4 weeks ago</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParallelVideos;
