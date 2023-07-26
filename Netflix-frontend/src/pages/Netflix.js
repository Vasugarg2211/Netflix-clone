// import React, { useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import {FaPlay} from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai";
import "./Netflix.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovies, getGenres } from "../store/index";
import Slider from "../components/Slider";

const Netflix = () => {
    const navigate = useNavigate();
    
    const movies = useSelector((state) => state.netflix.movies);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const dispatch = useDispatch() ;
    
    useEffect(()=> {
        dispatch(getGenres()); 
    },[dispatch]);
    
    useEffect(()=> {
        if(genresLoaded) {
            dispatch(fetchMovies({type : "all"}));
        }
    })
    // console.log(genresLoaded);
    // console.log(movies);
    
    return (
        <div className="netflix-container">
            <Navbar />
            <div className="hero">
                <img src={backgroundImage} alt="background" className="background-image" />
                <div className="container">
                    <div className="logo">
                        <img src={movieLogo} alt="" srcset="" />
                    </div>
                    <div className="buttons flex">
                        <button className="flex a-center j-center"><FaPlay onClick={()=>navigate("/player")}/>Play</button>
                        <button className="flex a-center j-center"><AiOutlineInfoCircle/>More info</button>
                    </div>
                </div>
            </div>
            
            <Slider movies={movies}/>
        </div>
    );
}
 
export default Netflix;