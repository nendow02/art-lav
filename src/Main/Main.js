import { useState, useContext, useEffect } from "react";
import {
  getStorage,
  listAll,
  ref,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";
import Upload from "../Upload/upload.js";
import Profile from "../Profile/Profile.js";
import Image from "../Image/Image.js";
import OutsideAlerter from "../Image/OutsideAlerter.js";
import { LocationContext } from "../Location/LocationContext.js";
import { ProfileContext } from "../Profile/ProfileContext.js";
import profileImg from "../img/profile.svg";
import ImageSmall from "./ImageSmall.js";
import "./main.css";

function Main(props) {
  const [openedImage, setOpenedImage] = useState(null);
  const {lat,lng} = useContext(LocationContext); 
  const [urls,setUrls] = useState([]);
  const [names,setNames] = useState([]);
  const [change,setChange] = useState(false);
  const { isProfileOpen, setIsProfileOpen } = useContext(ProfileContext);
  
  const handleChange = () => {
    setChange(!change);
  }

  // Download photos
  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const newRef = ref(storage, "images");
      let result = await listAll(newRef);
      let urlsPromises = result.items.map(itemRef => {
            return getMetadata(itemRef)
              .then((metadata) => {
                const latDiff = parseFloat(metadata.customMetadata.lat) - lat;
                const lngDiff = parseFloat(metadata.customMetadata.long) - lng;
                const distance = Math.sqrt(Math.pow(latDiff,2) + Math.pow(lngDiff,2));
                console.log(distance);
                if (distance < .3) { // 20 miles
                  setNames(refs => [...refs,itemRef.name]);
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
  }
  
  ,[change,lat,lng]);
  
  const showImages = () =>  {
    const imageLayout = [[], [], [], [], []];
    const refLayout = [[],[],[],[],[]];
    const images = [...urls];
    for (let i = 0; i < images.length; i++) {
      imageLayout[i % 5].push(images[i]);
      refLayout[i % 5].push(names[i]);
      console.log(images[i]);
    }
    return (
      <div className="column-container">
        {imageLayout.map((col) => (
          <div className="column">
            {col.map((img) => (
              <ImageSmall
                img={img}
                name={refLayout[col.indexOf(img)]}
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
            <Upload onChange={handleChange}/>
            {showImages()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
