import React, { useState, useContext } from "react";
import MapPicker from "react-google-map-picker";
import { LocationContext } from "./LocationContext.js";

const Map = (props) => {
  const DefaultZoom = 10;
  const [zoom, setZoom] = useState(DefaultZoom);

  const { lat, lng, setLat, setLng } = useContext(LocationContext);

  function handleChangeLocation(lat, lng) {
    setLat(lat);
    setLng(lng);
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function closeMap() {
    props.setMap(!props.map);
  }

  return (
    <div>
      <h2>Select your location:</h2>
      <MapPicker
        defaultLocation={{ lat: lat, lng: lng }}
        zoom={zoom}
        mapTypeId="roadmap"
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
        style={{ height: "500px", width: "500px", margin: "0 auto" }}
      />
      <button style={{ margin: "20px" }} onClick={closeMap}>
        I'm done!
      </button>
    </div>
  );
};

export default Map;
