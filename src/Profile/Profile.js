import { useContext } from "react";
import { LocationContext } from "../Location/LocationContext.js";

function Profile(props) {
  const { lat, lng, setIsMapOpen } = useContext(LocationContext);
  return (
    <div>
      <div>this is the profile page uwu</div>
      <button onClick={() => props.setIsProfileOpen(false)}>
        go back to main page
      </button>
      <button onClick={() => setIsMapOpen(true)}>change location</button>
      <div>
        current location is {lat}, {lng}
      </div>
    </div>
  );
}
export default Profile;
