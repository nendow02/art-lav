import "./App.css";
import { useContext } from "react";
import Location, { LocationContext, LocationProvider } from "./Location.js";

function App() {
  const { lat, lng } = useContext(LocationContext);
  return (
    <div className="App">
      <Location />
      <LocationProvider>
        <div>
          latitude is {lat}, longitude is {lng}
        </div>
      </LocationProvider>
    </div>
  );
}

export default App;

// PUT ALL LOCATION STUFF UNDER ONE LOCATIONPROVIDER
