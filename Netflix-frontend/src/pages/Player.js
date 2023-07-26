import "./Player.css";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/video-netflix.mkv";

const Player = () => {
    const navigate = useNavigate()
    return (
        <div className="player-container">]
            <div className="player">
                <div className="back">
                    <BsArrowLeft  onClick={()=>navigate(-1)}/>
                </div>
                <video src={video} autoPlay controls muted loop></video>
            </div>
        </div>
    );
}
 
export default Player;