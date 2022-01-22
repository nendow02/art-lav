import "./App.css";
import { useContext } from "react";
import { LocationContext } from "./Location/LocationContext.js";
import Location from "./Location/Location.js";
import Main from "./Main/Main.js";

function AppScreen() {
  const { isMapOpen } = useContext(LocationContext);
  return (
    <div className="App">
      {isMapOpen && <Location />}
      {!isMapOpen && <Main />}
    </div>
  );
}

export default AppScreen;
