import { useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import video from "../assets/video-netflix.mkv";
import {IoPlayCircleSharp} from "react-icons/io5";
import {BiChevronDown} from "react-icons/bi";
import {RiThumbUpFill, RiThumbDownFill} from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
// import { useDispatch } from "react-redux";

const Card = ({ movieData, isLiked=false }) => {
    
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) {
      setEmail(currentUser.email);
    }
    else {
      navigate("/login");
    }
  });
  
  const addToList = async () => {
    console.log({email, data:movieData});
    // console.log(email);
    // alert("ran");
    try {
       await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
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
                {isLiked ? (
                  <BsCheck
                    title="Remove from List" />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={() => addToList()}/>
                )}
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
