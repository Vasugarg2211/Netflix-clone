import { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import "./SignUp.css";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [showpassword, setShowPassword] = useState(false);
    const [formValue, setFormValue] = useState({
        email:"",
        password:""
    });
    
    const handleSignIn = async () => {
        try {
            const {email, password} = formValue;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch(err) {
            console.log(err);
        }
    }
    
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) navigate("/");
    })
    
    return (
        <div className="signup-container" showpassword = {showpassword}>
            <BackgroundImage />
            <div className="content-signup">
                <Header login/>
                <div className="body-signup flex a-centre j-centre column">
                    <div className="text-signup flex column">
                        <h1>Unlimited movies, Tv Shows and more</h1>
                        <h4>Watch anywhere. Cancel anytime.</h4>
                        <h6>Ready to watch? Enter your email to create or restart your membership.</h6>
                    </div>
                    <div className="form-signup">
                        <input type="email" placeholder="Email Address" name="email" value={formValue.email} onChange={(e) => setFormValue({...formValue, [e.target.name]:e.target.value})} />
                        {showpassword && <input type="password" placeholder="Password" name="password" value={formValue.password} onChange={(e) => setFormValue({...formValue, [e.target.name]:e.target.value})}/>}
                        {!showpassword && <button onClick={ () => setShowPassword(true) }>Get Started</button>}
                    </div>
                    <button onClick={handleSignIn}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}
 
export default SignUp;