import { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import "./Login.css";
import { onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email:"",
        password:""
    });
    
    const handleLogin = async () => {
        try {
            const {email, password} = formValue;
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch(err) {
            console.log(err);
        }
    }
    
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) navigate("/");
    })
    
    return (
        <div className="login-container">
            <BackgroundImage />
            <div className="content-login">
                <Header />
                <div className="body-container-login">                    
                    <div className="form-login a-center j-center flex column">
                        <div className="title-login">
                            <h3>Login</h3>
                        </div>
                        
                        <div className="container-login flex column">
                            <input type="email" placeholder="Email Address" name="email" value={formValue.email} onChange={(e) => setFormValue({...formValue, [e.target.name]:e.target.value})} />
                            <input type="password" placeholder="Password" name="password" value={formValue.password} onChange={(e) => setFormValue({...formValue, [e.target.name]:e.target.value})}/>
                            <button onClick={ handleLogin }>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;