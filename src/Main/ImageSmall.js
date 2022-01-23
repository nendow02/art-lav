import { useState } from "react";
import unlikedImg from "../img/unliked.svg";
import unlikedImgHover from "../img/unliked-hover.svg";
import likedImg from "../img/liked.svg";
import "./main.css";

function ImageSmall(props) {
  const [showLike, setShowLike] = useState(false);

  // changes this Liked var from a useState to props later
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="image-container-main"
      onMouseEnter={() => {
        setShowLike(true);
      }}
      onMouseLeave={() => {
        setShowLike(false);
      }}
    >
      {/* rn liked is a const, change this to like img.likes or something*/}
      {!liked && (
        <img
          className={`like-button-main ${!showLike && "invisible"}`}
          src={unlikedImg}
          onClick={() => setLiked(true)}
          onMouseOver={(e) => (e.currentTarget.src = unlikedImgHover)}
          onMouseOut={(e) => (e.currentTarget.src = unlikedImg)}
        />
      )}
      {liked && (
        <img
          className={`like-button-main`}
          src={likedImg}
          onClick={() => setLiked(false)}
        />
      )}
      <img
        src={props.img}
        className={`image ${props.openedImage && "unclickable"}`}
        onClick={() => props.setOpenedImage(props.img)}
      />
    </div>
  );
}

export default ImageSmall;
