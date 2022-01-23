import { useContext } from "react";
import { LocationContext } from "../Location/LocationContext.js";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../Authentication/AuthContext.js";
import { ProfileContext } from "./ProfileContext.js";
import backButton from "../img/back.svg";
import signout from "../img/signout.svg";
import map from "../img/map.svg";
import "./profile.css";

function Profile(props) {
  const { lat, lng, setIsMapOpen } = useContext(LocationContext);
  const { setIsSignedIn } = useContext(AuthContext);
  const { setIsProfileOpen } = useContext(ProfileContext);
  const auth = getAuth();

  return (
    <div>
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
      <h2>Your Posts</h2>
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
    <h1>our app name owo</h1>
    <img
      className="profile-button"
      src={profileImg}
      onClick={() => setIsProfileOpen(true)}
    />
    <Upload />
    {showImages()}
  </div>
</div> */
}
