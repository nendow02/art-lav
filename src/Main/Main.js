import { useState } from "react";
import Upload from "../upload.js";

import Profile from "../Profile/Profile.js";

function Main(props) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div>
      {isProfileOpen && <Profile setIsProfileOpen={setIsProfileOpen} />}
      {!isProfileOpen && (
        <div>
          <h1>our app name owo</h1>
          <button onClick={() => setIsProfileOpen(true)}>
            go to profile page
          </button>

          <div>images go brr</div>
          <Upload/>
        </div>
      )}
    </div>
  );
}

export default Main;
