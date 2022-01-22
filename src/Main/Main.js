import { useContext } from "react";
import { LocationContext } from "../Location/LocationContext.js";

function Main(props) {
  const { lat, lng } = useContext(LocationContext);
  return (
    <div>
      <div>main page here</div>
      <div>
        current location is {lat}, {lng}
      </div>
      <button onClick={() => props.setMap(!props.Map)}>change location</button>
    </div>
  );
}

export default Main;
