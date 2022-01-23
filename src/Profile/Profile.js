import { useState, useContext, useEffect } from "react";
import {
  getStorage,
  listAll,
  ref,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";
import { LocationContext } from "../Location/LocationContext.js";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../Authentication/AuthContext.js";
import { ProfileContext } from "./ProfileContext.js";
import OutsideAlerter from "../Image/OutsideAlerter.js";
import Image from "../Image/Image.js";
import Upload from "../Upload/upload.js";
import ImageSmall from "../Main/ImageSmall.js";
import backButton from "../img/back.svg";
import signout from "../img/signout.svg";
import map from "../img/map.svg";
import "./profile.css";

function Profile(props) {
  const { lat, lng, setIsMapOpen } = useContext(LocationContext);
  const { setIsSignedIn } = useContext(AuthContext);
  const { setIsProfileOpen } = useContext(ProfileContext);
  const auth = getAuth();

  const [openedImage, setOpenedImage] = useState(false);
  const [urls, setUrls] = useState([]);

  // Download photos
  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const newRef = ref(storage, "images");
      let result = await listAll(newRef);
      let urlsPromises = result.items.map((itemRef) => {
        return getMetadata(itemRef).then((metadata) => {
          if (metadata.customMetadata.id === auth.currentUser.uid) {
            return getDownloadURL(itemRef);
          } else return null;
        });
      });
      return Promise.all(urlsPromises);
    };
    const loadImages = async () => {
      const urls = await fetchImages();
      setUrls(urls);
    };
    loadImages();
  }, []);

  const showImages = () => {
    const imageLayout = [[], [], [], [], []];
    const images = [...urls].filter((url) => url != null);
    console.log(images);
    for (let i = 0; i < images.length; i++) {
      imageLayout[i % 5].push(images[i]);
    }
    return (
      <div className="column-container">
        {imageLayout.map((col) => (
          <div className="column">
            {col.map((img) => (
              <ImageSmall
                img={img}
                openedImage={openedImage}
                setOpenedImage={setOpenedImage}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {openedImage && (
        <OutsideAlerter setOpenedImage={setOpenedImage}>
          <Image img={openedImage} />
        </OutsideAlerter>
      )}

      <div className={`profile-container ${openedImage && "blur"}`}>
        <h2>Your Posts</h2>
        <img
          className="back-button"
          src={backButton}
          onClick={() => {
            setIsProfileOpen(false);
          }}
        />
        <img
          className="map-button"
          src={map}
          onClick={() => {
            setIsMapOpen(true);
          }}
        />
        <img
          className="profile-button"
          src={signout}
          onClick={() => {
            signOut(auth).then(() => {
              console.log("signed out");
              setIsSignedIn(false);
            });
          }}
        />
        <Upload />
        {showImages()}
      </div>
    </div>
  );
}
export default Profile;

{
  /* <div>
  {openedImage && (
    <OutsideAlerter setOpenedImage={setOpenedImage}>
      <Image img={openedImage} />
    </OutsideAlerter>
  )}

  <div className={openedImage && "blur"}>
    <h2>Your Posts</h2>
         <img
        className="back-button"
        src={backButton}
        onClick={() => {
          setIsProfileOpen(false);
        }}
      />
      <img
        className="map-button"
        src={map}
        onClick={() => {
          setIsMapOpen(true);
        }}
      />
      <img
        className="profile-button"
        src={signout}
        onClick={() => {
          signOut(auth).then(() => {
            console.log("signed out");
            setIsSignedIn(false);
          });
        }}
      />
    <Upload />
    {showImages()}
  </div>
</div> */
}
