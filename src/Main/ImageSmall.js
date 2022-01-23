import { useEffect, useState } from "react";
import unlikedImg from "../img/unliked.svg";
import likedImg from "../img/liked.svg";
import { updateMetadata, getMetadata, getStorage, ref} from "firebase/storage";
import "./main.css";

function ImageSmall(props) {
  const [showLike, setShowLike] = useState(false);

  // changes this Liked var from a useState to props later
  const [liked, setLiked] = useState(false);
  const storage = getStorage();

  const handleClick = (liked) => {
    const newRef = ref(storage, "images/"+props.name);
    getMetadata(newRef)
      .then((oldMeta) => {
        console.log(oldMeta);
        let addonLike = liked ? 1 : -1;
        const newMetadata = {
          customMetadata: {
            lat: oldMeta.customMetadata.lat,
            long: oldMeta.customMetadata.long,
            id: oldMeta.customMetadata.id,
            likes: (parseInt(oldMeta.customMetadata.likes) + addonLike).toString()
          },
        }
        updateMetadata(newRef,newMetadata)
          .then(() => {
            console.log("like metadata success");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
  }

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
          onClick={() => {
            setLiked(true);
            handleClick(true);
          }}
        />
      )}
      {liked && (
        <img
          className={`like-button-main`}
          src={likedImg}
          onClick={() => {
            setLiked(false);
            handleClick(false);
          }}
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
