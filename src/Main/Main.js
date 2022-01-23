import { useState,useContext, useEffect } from "react";
import { getStorage, listAll, ref, getMetadata, getDownloadURL } from "firebase/storage";
import Upload from "../upload.js";
import Profile from "../Profile/Profile.js";
import Image from "../Image/Image.js";
import OutsideAlerter from "../Image/OutsideAlerter.js";
import { LocationContext } from "../Location/LocationContext.js";
import profileImg from "../img/profile.svg";
import "./main.css";

function Main(props) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openedImage, setOpenedImage] = useState(null);
  const {lat,lng} = useContext(LocationContext); 
  const [urls,setUrls] = useState([]);

  // Download photos
  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const newRef = ref(storage,'images');
      let result = await listAll(newRef);
      let urlsPromises = result.items.map(itemRef => {
            return getMetadata(itemRef)
              .then((metadata) => {
                const latDiff = parseFloat(metadata.customMetadata.lat) - lat;
                const lngDiff = parseFloat(metadata.customMetadata.long) - lng;
                const distance = Math.sqrt(Math.pow(latDiff,2) + Math.pow(lngDiff,2));
                if (distance < .3) { // 20 miles
                  return getDownloadURL(itemRef);
                } else return null;
              });
      });
      return Promise.all(urlsPromises);
    };
    const loadImages = async () => {
      const urls = await fetchImages();
      setUrls(urls);
    }
    loadImages();
  }
  
  ,[]);
  
  const showImages = () =>  {
    const imageLayout = [[], [], [], [], []];
      const images = [...urls];
      console.log(images);
      for (let i = 0; i < images.length; i++) {
        imageLayout[i % 5].push(images[i]);
      }
    return (
      <div className="column-container">
        {imageLayout.map((col) => (
          <div className="column">
            {col.map((img) => (
              <img
                src={img}
                className={`image ${openedImage && "unclickable"}`}
                onClick={() => setOpenedImage(img)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="main">
      {isProfileOpen && <Profile setIsProfileOpen={setIsProfileOpen} />}
      {!isProfileOpen && (
        <div>
          {openedImage && (
            <OutsideAlerter setOpenedImage={setOpenedImage}>
              <Image img={openedImage} />
            </OutsideAlerter>
          )}

          <div className={openedImage && "blur"}>
            <h1>our app name owo</h1>
            <img
              className="profile-button"
              src={profileImg}
              onClick={() => setIsProfileOpen(true)}
            />
            <Upload />
            {showImages()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
