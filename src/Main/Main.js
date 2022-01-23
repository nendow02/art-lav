import { useState } from "react";
import Upload from "../Upload/upload.js";
import Profile from "../Profile/Profile.js";
import Image from "../Image/Image.js";
import OutsideAlerter from "../Image/OutsideAlerter.js";
import profileImg from "../img/profile.svg";
import ImageSmall from "./ImageSmall.js";
import "./main.css";

// dummy images
import Eren from "../img/eren.png";
import Hornbee from "../img/hornbee.png";

const liked = false;

function Main(props) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openedImage, setOpenedImage] = useState(null);

  // generating list of dummy images
  const dummyImages = () => {
    const dummies = [Eren, Hornbee];
    let images = [];
    for (let i = 0; i < 13; i++) {
      images = images.concat(dummies);
    }
    images.pop();
    return images;
  };

  const showImages = () => {
    const images = dummyImages();
    const imageLayout = [[], [], [], [], []];
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
