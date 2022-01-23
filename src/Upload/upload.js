import "./upload.css";
import upload from "../img/upload.svg";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, updateMetadata } from "firebase/storage";
import { LocationContext } from "../Location/LocationContext";
import { useContext } from "react";

function Upload(props) {
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();
  const auth = getAuth();
  const { lat, lng } = useContext(LocationContext);

  const handleSubmit = (e) => {
    if (!auth.currentUser) {
      console.log("Not signed in");
      return;
    }
    if (!e) {
      alert("No file selected");
      return;
    }
    if (lat === null || lng === null) {
      alert("Location not chosen");
      return;
    }
    const newRef = ref(storage, "images/" + e.name);
    const newMetadata = {
      customMetadata: {
        lat: "" + lat,
        long: "" + lng,
        id:auth.currentUser.uid,
        likes:"0"
      },
    };
    uploadBytes(newRef, e)
      .then((snapshot) => {
        console.log("upload success");
        updateMetadata(newRef, newMetadata)
          .then(() => {
            console.log("metadata success");
            props.onChange();
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="upload-container">
      <label className="file-wrapper">
        <img src={upload} className="upload-button" />
        <input
          type="file"
          onChange={(e) => handleSubmit(e.target.files[0])}
          className="file"
        />
      </label>
    </div>
  );
}

export default Upload;
