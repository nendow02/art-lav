import { useState } from "react";
import "./image.css";
import unliked from "../img/unliked.svg";
import liked from "../img/liked.svg";

function Image(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [showLike, setShowLike] = useState(false);

  return (
    <div
      className="image-container"
      onMouseEnter={() => {
        setShowLike(true);
      }}
      onMouseLeave={() => {
        setShowLike(false);
      }}
    >
      {!isLiked && (
        <img
          src={unliked}
          className={`like-button ${!showLike && "invisible"}`}
          onClick={() => setIsLiked(true)}
        />
      )}
      {isLiked && (
        <img
          src={liked}
          className={`like-button ${!showLike && "invisible"}`}
          onClick={() => setIsLiked(false)}
        />
      )}
      <img className="opened-image" src={props.img} />
    </div>
  );
}

export default Image;
