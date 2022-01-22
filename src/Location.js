import React, { useState, useContext, createContext } from "react";
import MapPicker from "react-google-map-picker";

export const LocationContext = createContext({ lat: 34.06, lng: -118.44 });

export const LocationProvider = (props) => {
  const [lat, setLat] = useState(34.06);
  const [lng, setLng] = useState(-118.44);

  return (
    // the Provider gives access to the context to its children
    <LocationContext.Provider value={{ lat, lng, setLat, setLng }}>
      {props.children}
    </LocationContext.Provider>
  );
};

const App = () => {
  return (
    <LocationProvider>
      <Map />
    </LocationProvider>
  );
};

const Map = () => {
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
    console.log(lat);
    console.log(lng);
  }

  return (
    <div>
      <button onClick={closeMap}>I'm done!</button>
      <label>Latitute:</label>
      <input type="text" value={lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />

      <MapPicker
        defaultLocation={{ lat: lat, lng: lng }}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{ height: "700px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
      />
    </div>
  );
};

export default App;
