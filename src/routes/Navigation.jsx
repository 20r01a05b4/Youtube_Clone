import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../pages/home';
import SignupPage from '../navbar/signin/signup_page/signup_page';
import Logged from '../navbar/signin/login/Login';
import app from '../backend/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Upload from '../Upload_video/Upload/Upload';
import Channel from '../Upload_video/create_channel/Channel';
import VideoClicked from '../pages/video_clicked/videoclicked';


const Navigation = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        sessionStorage.setItem('user', user.email);
        setUser(user.email.split('@')[0]);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videoclicked/:videoId" element={<VideoClicked />} />
        {user ? (
          <>
             {/* <Route path="/uploadvideo" element={<Upload />} />  */}
              <Route path="/createchannel" element={<Channel />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignupPage />} />
            <Route path="/login" element={<Logged />} />
          </>
        )}

      </Routes>
      
    </Router>
  );
};

export default Navigation;
