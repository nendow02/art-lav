import {initializeApp} from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { useState } from 'react';

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
    
    const auth = getAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMsg,setErrorMsg] = useState("");

  return (
    <div>
      <input 
        placeholder='email' 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}/>
      <input 
            placeholder='password' 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}/>
      <button onClick={() => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                props.handleSuccess();
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // if (errorCode == "auth/weak-password")
                    //     setErrorMsg("Weak password")
                    // else 
                        setErrorMsg(error.message);
         });
      }}>Create Account</button>
      <button onClick={() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                props.handleSuccess();
                // ...
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // if (errorCode == "auth/weak-password")
                    //     setErrorMsg("Weak password")
                    // else 
                        setErrorMsg(error.message);
         });
      }}>Sign In</button>
      <button onClick={() => {
        signOut(auth)
          .then(()=> console.log("signed out"));
      }}>
      Sign out</button>
      <div>{errorMsg}</div>
    </div>
  );
}

export default Login;
