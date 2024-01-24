import "./home.css";
import React from "react";
import Navbar from "../navbar/nav";
import Topbar from "./sidebar/topbar";
import Asidebar from "./asidebar/asidebar";
import VideoBox from "./video_contanier/video";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="sidebar">
        <h1>sidebar</h1>
        <h1>sidebar</h1>
        <h1>sidebar</h1>
        <h1>sidebar</h1>
      </div>
      <Topbar />
      <Asidebar />
      <VideoBox />
    </>
  );
};

export default Home;
