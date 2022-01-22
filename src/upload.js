import './upload.css';
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, updateMetadata } from "firebase/storage";
import { LocationContext } from './Location/LocationContext';
import { useContext } from 'react';

function Upload() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage();
    const auth = getAuth();
    const {lat,lng} = useContext(LocationContext); 

    const handleSubmit = (e) => {
      if (!auth.currentUser) {
        console.log("Not signed in");
        return;
      }
      if (!e) {
          console.log("No file selected");
          return;
      }
      if (lat === null || lng === null) {
          console.log("Location not chosen");
          return;
      }
      let id = auth.currentUser.uid;
      const newRef = ref(storage,'images/' + id + '/' + e.name);
      const newMetadata = {
        customMetadata: {
        'lat':''+lat,
        'long':''+lng
        }
      }
       uploadBytes(newRef,e)
          .then((snapshot) => {
            console.log("upload success");
            updateMetadata(newRef,newMetadata)
               .then(() => console.log("metadata success"))
               .catch((error) => {
                  console.log(error.message);
         });
          })
          .catch((error) => {
                console.log(error.message);
        });
    }

  return (
    <div>
        <label className = "file-wrapper">
            +
           <input type="file" onChange={(e) => handleSubmit(e.target.files[0])} className='file'/>
        </label>
    </div>
  );
}

export default Upload;
