import BackGround from "../assets/login.jpg";
import "./BackgroundImage.css";

const BackgroundImage = () => {
    return (
        <div className="bgImg-container">
            <img src={BackGround} alt="Background" />
        </div>
    );
}
 
export default BackgroundImage;