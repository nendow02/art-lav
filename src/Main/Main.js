import { useContext } from "react";
import { LocationContext } from "../Location/LocationContext.js";

function Main(props) {
  const { lat, lng, setIsMapOpen } = useContext(LocationContext);
  return (
    <div>
      <div>main page here</div>
      <div>
        current location is {lat}, {lng}
      </div>
      <button onClick={() => setIsMapOpen(true)}>change location</button>
    </div>
  );
}

export default Main;
