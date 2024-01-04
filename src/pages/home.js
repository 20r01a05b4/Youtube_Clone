import "./home.css"
import Navbar from "../navbar/nav"
import { FaHome } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { SiYoutubeshorts } from "react-icons/si";
import { BsCollectionPlay } from "react-icons/bs";
import Topbar from "./sidebar/topbar";
import VideoBox from "./video_contanier/video";
const Home=()=>{
    return(
        <>
        <Navbar></Navbar>
        <></>
        <div className="sidebar">
            <h1>sidebar</h1>
            <h1>sidebar</h1>
            <h1>sidebar</h1>
            <h1>sidebar</h1>
        </div>
        <Topbar></Topbar>
        <aside className="side_contanier">
            <div className="home">
                <div className="inside_home" >
                    <FaHome className="icon" size="30px"></FaHome>
                    <p className="home_name">Home</p>
                </div>
            </div>
            <div className="shorts">
                <div>
                <FaPlay className="icon" size="30px"></FaPlay>
                <p>Shorts</p>
                </div>
            </div>
            <div className="subscription">
                <div>
                <SiYoutubeshorts className="icon" size="30px"></SiYoutubeshorts>
                <p>subscription</p>
                </div>
            </div>
            <div className="you">
                <div>
                <BsCollectionPlay className="icon" size="30px"></BsCollectionPlay>
                <p>you</p>
                </div>
            </div>
        </aside>
        <VideoBox/>
        </>
    )
}
export default Home