import './login.css';
import {initializeApp} from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { useState, useContext } from 'react';
import {AuthContext} from './AuthContext';
import {LocationContext} from '../Location/LocationContext';


function Login(props) {
    // Your web app's Firebase configuration
    const config = {
        apiKey: "AIzaSyCx8R1zIWWSznLZoo5dgDW7pxg35w93PnI",
        authDomain: "qwer-hacks-2022.firebaseapp.com",
        projectId: "qwer-hacks-2022",
        storageBucket: "qwer-hacks-2022.appspot.com",
        messagingSenderId: "767723686526",
        appId: "1:767723686526:web:cd97bf3adfea822dbfe62f"
    };
    
    // Initialize Firebase
    initializeApp(config);
    const {setid,setIsSignedIn} = useContext(AuthContext);
    const {setIsMapOpen} = useContext(LocationContext);
    const auth = getAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

  return (
    <div className='wrapper'>
      <div>
        <img alt='logo' className='logo'/><br/>
        <input 
          className='input'
          placeholder='Email' 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}/><br/>
        <input 
          className='input'
          placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}/><br/>
        <button className='login' onClick={() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed in 
                  setid(userCredential.user.id);
                  setIsSignedIn(true);
                  setIsMapOpen(true);
                })
                .catch((error) => {
                      alert(error.message);
          });
          }}>Log in</button><br/>
        <button className='forgot' onChange={() => {
          console.log("need to implement still");
        }}>Forgot Password?</button><br/>
        <button onClick={() => {
              createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                  // Signed in 
                  setid(userCredential.user.id);
                  })
                  .catch((error) => {
                        alert(error.message);
          });
        }}>Create Account</button><br/>
        <button onClick={() => {
          signOut(auth)
            .then(()=> console.log("signed out"));
        }}>
        Sign out</button>
      </div>
    </div>
  );
}

export default Login;
