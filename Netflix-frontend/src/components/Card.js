import { useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import video from "../assets/video-netflix.mkv";
import {IoPlayCircleSharp} from "react-icons/io5";
import {BiChevronDown} from "react-icons/bi";
import {RiThumbUpFill, RiThumbDownFill} from "react-icons/ri";

const Card = ({ movieData }) => {
    
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div
      className="card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt=""
        srcset=""
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            
            <video src={video} autoPlay muted loop onClick={()=>navigate("/player")} />
          </div>
          
          <div className="info-container flex column">
            <h3 className="name" onClick={()=>navigate("/player")}>{movieData.name}</h3>
          </div>
          <div className="icons flex j-between">
            <div className="controls flex">
                <IoPlayCircleSharp title="play" onClick={()=>navigate("/player")}/>
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                
            </div>
            <div className="info">
                <BiChevronDown title="More Info" />
            </div>
          </div>
          
          <div className="genres flex">
            <ul className="flex">
                {movieData.genres.map((genre) => (
                    <li>{genre}</li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
