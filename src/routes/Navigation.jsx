import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import SignupPage from '../navbar/signin/signup_page/signup_page';
import Logged from '../navbar/signin/login/Login';
import app from '../backend/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Upload from '../Upload_video/Upload/Upload';
import Channel from '../Upload_video/create_channel/Channel';

const Navigation = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", user.email);
        setUser(user.email);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {user ? (
          <>
          <Route path="/Uploadvideo" element={<Upload></Upload>}></Route>
          <Route path="createchannel" element={<Channel></Channel>}></Route>
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
