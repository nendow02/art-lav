import "./App.css";
import { useContext } from "react";
import { LocationContext } from "./Location/LocationContext.js";
import { AuthContext } from "./Authentication/AuthContext";
import Login from "./Authentication/login";
import Location from "./Location/Location.js";
import Main from "./Main/Main.js";

function AppScreen() {
  const { isMapOpen } = useContext(LocationContext);
  const {isSignedIn} = useContext(AuthContext);
  return (
    <div className="App">
      {!isSignedIn && <Login/>}
      {isMapOpen && <Location />}
      {!isMapOpen && isSignedIn && <Main />}
    </div>
  );
}

export default AppScreen;
