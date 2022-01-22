import "./App.css";
import { useContext,useState } from "react";
import { LocationContext } from "./Location/LocationContext.js";
import Login from "./login";
import Location from "./Location/Location.js";
import Main from "./Main/Main.js";

function AppScreen() {
  const { isMapOpen } = useContext(LocationContext);
  const [loginOpen,setLoginOpen] = useState(true);
  return (
    <div className="App">
      {loginOpen ? <Login handleSuccess={() => setLoginOpen(!loginOpen)}/>: null}
      {isMapOpen && <Location />}
      {!isMapOpen && <Main />}
    </div>
  );
}

export default AppScreen;
