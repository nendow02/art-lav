//import {initializeApp} from "firebase/app";
import './upload.css';
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Upload() {
    // Your web app's Firebase configuration
    // const config = {
    //     apiKey: "AIzaSyCx8R1zIWWSznLZoo5dgDW7pxg35w93PnI",
    //     authDomain: "qwer-hacks-2022.firebaseapp.com",
    //     projectId: "qwer-hacks-2022",
    //     storageBucket: "qwer-hacks-2022.appspot.com",
    //     messagingSenderId: "767723686526",
    //     appId: "1:767723686526:web:cd97bf3adfea822dbfe62f"
    // };
    
    // // Initialize Firebase
    // initializeApp(config);

    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage();
    const auth = getAuth();

    const handleSubmit = (e) => {
      if (!auth.currentUser) {
        console.log("Not signed in");
        return;
      }
      if (!e) {
          console.log("No file selected");
          return;
      }
       let id = auth.currentUser.uid;
       const newRef = ref(storage,'images/' + id + '/' + e.name);
       uploadBytes(newRef,e).then((snapshot) => console.log("upload success"))
          .catch((error) => {
                console.log(error.message);
        });
    }

  return (
    <div>
        <label class = "file-wrapper">
            +
           <input type="file" onChange={(e) => handleSubmit(e.target.files[0])} className='file'/>
        </label>
    </div>
  );
}

export default Upload;
