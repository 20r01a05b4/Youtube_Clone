import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import app from "../../backend/Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import "./video.css"

const VideoBox = () => {
  
  const link_ref = useRef(null);
  const [videos, setVideos] = useState([]);
  const current_user = sessionStorage.getItem("user")?sessionStorage.getItem("user").split("@")[0]:null;
  //const channel=localStorage.getItem("channel");


  const handleVideoClick = (e)=>{
    e.preventDefault();
    link_ref.current.click();
  
  };

/* channel checker*/
    const channelChecker=async()=>{
      await new Promise((resolve)=>{
        const db=getDatabase(app);
        const refer=ref(db,current_user+"/channel");
        onValue(refer,(snapshot)=>{
          const data=snapshot.val();
          if(data){
         
            sessionStorage.setItem("channel","true")
          }
          else{
            sessionStorage.setItem("channel",false);
          }
        })
      })
}

 channelChecker()
  

  const checkSubscribe = useCallback(async (video_username, obj) => {
    
    // Wrap the onValue function in a Promise
    await new Promise((resolve) => {
      const refer = ref(getDatabase(app), "subscribersdata/" + video_username + "/subscribers/" + current_user);
      onValue(refer, (snapshot) => {
        const val = snapshot.val();

        if (val) {
          setVideos((prevVideos) => [...prevVideos, obj]);
        } 
        resolve();
      });
    });
   
  }, [setVideos,current_user]);

  useEffect(() => {
    const db = getDatabase(app);
    const refer = ref(db, "videos");

    const fetchData = async () => {
      const unsubscribe = await new Promise((resolve) => {
        onValue(refer, async (snapshot) => {
          const value = snapshot.val();
          
          if(current_user){

          if (value) {
            const filterData = value.filter((video) => video.access === "Any User can view the videos");
            setVideos(filterData);
            const notAccess = value.filter((video) => video.access === "Only Subscribers has to view the videos");
           

            for (const obj of notAccess) {
              await checkSubscribe(obj["handler_name"], obj);
            }
          } }
          else{
            setVideos(value);
          }
          
          resolve();
        });
      });

      return () => {
        unsubscribe();
      };
    };

    fetchData();
  }, [checkSubscribe,current_user]);

  let a = [];
  for (let i = 0; i < 5; i++) {
    a.push(i);
  }

  const [limit, setLimit] = useState(6);

  const increaseLimit = () => {
    setLimit(21);
  };

  const decreaseLimit = () => {
    setLimit(6);
  };

  return (
    <div className="video_contanier">
      <div className="inner_contanier">
        {videos &&
          videos.map((val, index) => (
            <div key={index} className="box">
              <video
                controls
                width="100%"
                height="70%"
                src={val["url"]}
                style={{ "borderRadius": "7px","cursor":"pointer" }}
                onClick={handleVideoClick}
              ></video>
              <Link
                ref={link_ref}
                style={{ display: "none" }}
                to={`/videoclicked/${index}`}
                state={{ video: val }}
              >
                Click here
              </Link>
              <h3 style={{ color: "white" }}>{val["title"]}</h3>
            </div>
          ))}
        {limit <= 6 && (
          <button className="show" onClick={increaseLimit}>
            <h3>showmore</h3>
          </button>
        )}
        {limit > 6 && (
          <button className="showless" onClick={decreaseLimit}>
            showless
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoBox;
