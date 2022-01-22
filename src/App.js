import "./App.css";
import { useState } from "react";
import { LocationProvider } from "./Location/LocationContext.js";
import Location from "./Location/Location.js";
import Main from "./Main/Main.js";

function App() {
  const [map, setMap] = useState(true);
  return (
    <div className="App">
      <LocationProvider>
        {map && <Location map={map} setMap={setMap} />}
        {!map && <Main map={map} setMap={setMap} />}
      </LocationProvider>
    </div>
  );
}

export default App;

// PUT ALL LOCATION STUFF UNDER ONE LOCATIONPROVIDER
