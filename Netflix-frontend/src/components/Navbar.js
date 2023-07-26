import "./Navbar.css";
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import { useState } from "react";
import {FaSearch, FaPowerOff} from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const links = [
        {name:"Home", link:"/"},
        {name:"TV", link:"/tv"},
        {name:"Movies", link:"/movies"},
        {name:"My list", link:"/mylist"}
    ];
    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth, currentUser => {
        if(!currentUser) navigate("/login");
    });
    
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    return (
        <div className="navbar-container">
            <nav className="flex scrolled">
                <div className="left flex a-center">
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className="links flex">
                        {
                            links.map( ({name, link}) => {
                                return <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch?"show-search":""}`}>
                        <button onFocus={()=>setShowSearch(true)} onBlur={
                            () => {
                                if(!inputHover) setShowSearch(false);
                            }
                        }><FaSearch /></button>
                        
                        <input type="text" placeholder="Search" onMouseEnter={()=> setInputHover(true)} onMouseLeave={()=>setInputHover(false)} onBlur={()=>{setInputHover(false); setShowSearch(false)}} />
                    </div>
                    <button onClick={()=> signOut(firebaseAuth)}><FaPowerOff /></button>
                </div>
            </nav>
        </div>
    );
}
 
export default Navbar;