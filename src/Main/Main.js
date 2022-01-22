import { useState } from "react";
import Upload from "../upload.js";
import Profile from "../Profile/Profile.js";
import Image from "../Image/Image.js";
import OutsideAlerter from "../Image/OutsideAlerter.js";
import "./main.css";

// dummy images
import Eren from "../img/eren.png";
import Hornbee from "../img/hornbee.png";

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
              <img
                src={img}
                className="image"
                onClick={() => setOpenedImage(img)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
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
            <button onClick={() => setIsProfileOpen(true)}>
              go to profile page
            </button>
            <div>images go brr</div>
            {showImages()}
            <Upload />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
