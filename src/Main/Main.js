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
import logo from "../img/logo-main.svg";

function Main(props) {
  const [openedImage, setOpenedImage] = useState(null);
  const {lat,lng} = useContext(LocationContext); 
  const [urls,setUrls] = useState([]);
  const [names,setNames] = useState([]);
  const [likes,setLikes] = useState([]);
  const [change,setChange] = useState(false);
  const { isProfileOpen, setIsProfileOpen } = useContext(ProfileContext);

  const handleChange = () => {
    setChange(!change);
  };

  // Download photos
  useEffect(() => {
    const fetchImages = async () => {
      setLikes([]);
      setNames([]);
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
                  setNames(names => [...names,itemRef.name]);
                  console.log(metadata.customMetadata.likes);
                  setLikes(likes => [...likes,parseInt(metadata.customMetadata.likes)]);
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
  }, [change, lat, lng]);

  const showImages = () => {
    const imageLayout = [[], [], [], [], []];
    const images = [...urls].filter(url => url != null);
    let pairs = [];
    for (let i=0;i<images.length;i++) {
      pairs.push([likes[i],images[i],names[i]]);
    }
    pairs.sort(function(a,b){
      return b[0]-a[0];
    })
    console.log(pairs);
    for (let i = 0; i < images.length; i++) {
      imageLayout[i % 5].push(pairs[i]);
    }
    console.log(imageLayout);
    return (
      <div className="column-container">
        {imageLayout.map((col) => (
          <div className="column">
            {col.map((img) => {
              console.log(img);
              return (
              <ImageSmall
                img={img[1]}
                name={img[2]}
                openedImage={openedImage}
                setOpenedImage={setOpenedImage}
              />
            )})}
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

          <div className={`content-container ${openedImage && "blur"}`}>
            <img src={logo} className="logo" />
            <img
              className="profile-button"
              src={profileImg}
              onClick={() => setIsProfileOpen(true)}
            />
            <Upload onChange={handleChange} />
            {showImages()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
