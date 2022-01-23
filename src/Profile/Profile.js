import { useContext } from "react";
import { LocationContext } from "../Location/LocationContext.js";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../Authentication/AuthContext.js";

function Profile(props) {
  const { setIsMapOpen } = useContext(LocationContext);
  const { setIsSignedIn } = useContext(AuthContext);
  const auth = getAuth();

  return (
    <div>
      <div>this is the profile page uwu</div>
      <button onClick={() => props.setIsProfileOpen(false)}>
        go back to main page
      </button>
      <button onClick={() => setIsMapOpen(true)}>change location</button>
      <button
        onClick={() => {
          signOut(auth).then(() => {
            console.log("signed out");
            setIsSignedIn(false);
          });
        }}
      >
        Sign out
      </button>
    </div>
  );
}
export default Profile;
