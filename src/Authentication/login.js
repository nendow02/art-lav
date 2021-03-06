import "./login.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { LocationContext } from "../Location/LocationContext";
import { ProfileContext } from "../Profile/ProfileContext.js";
import loginOr from "../img/login-or.svg";
import logo from "../img/logo-login.svg";

function Login(props) {
  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyCx8R1zIWWSznLZoo5dgDW7pxg35w93PnI",
    authDomain: "qwer-hacks-2022.firebaseapp.com",
    projectId: "qwer-hacks-2022",
    storageBucket: "qwer-hacks-2022.appspot.com",
    messagingSenderId: "767723686526",
    appId: "1:767723686526:web:cd97bf3adfea822dbfe62f",
  };

  // Initialize Firebase
  initializeApp(config);
  const { setid, setIsSignedIn } = useContext(AuthContext);
  const { setIsMapOpen, setNewAccount } = useContext(LocationContext);
  const { setIsProfileOpen } = useContext(ProfileContext);
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyPress = (e) => {
    if (e.code === "Enter") login();
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setid(userCredential.user.id);
        setIsSignedIn(true);
        setIsMapOpen(false);
        setNewAccount(false);
        setIsProfileOpen(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="wrapper">
      <div className="vertical">
        <img alt="logo" className="logo" src={logo} />
        <br />
        <div className="input-container">
          <input
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onKeyPress={handleKeyPress}
          />
          <br />
          <input
            className="input"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onKeyPress={handleKeyPress}
          />
          <br />
        </div>
        <button className="login" onClick={login}>
          Log in
        </button>
        <br />
        <button
          className="forgot"
          onClick={() => {
            sendPasswordResetEmail(auth,email)
            .then(() => {
              alert("An email has been sent!")
            })
            .catch((error) => {
              if (error.code === 'auth/invalid-email')
                alert("Please enter a valid email");
            })
          }}
        >
          Forgot Password?
        </button>
        <img src={loginOr} className="or-bar" />
        <button className="dont">Don't have an account?</button>
        <button
          className="signup"
          onClick={() => {
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                setid(userCredential.user.id);
                setIsSignedIn(true);
                setNewAccount(true);
                setIsMapOpen(true);
              })
              .catch((error) => {
                alert(error.message);
              });
          }}
        >
          Sign Up!
        </button>
        <br />
      </div>
    </div>
  );
}

export default Login;
