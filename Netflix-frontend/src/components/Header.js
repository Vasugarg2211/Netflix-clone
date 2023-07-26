import "./Header.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate();
    return (
        <div className="container-header flex a-center j-between">
            <div className="logo-header">
                <img src={logo} alt="logo" />
            </div>
            <button className="btn-header" onClick={ () => navigate( props.login ? "/login" : "/signup" ) }>{ props.login ? "Log In" : "Sign In"}</button>
        </div>
    );
}
 
export default Header;