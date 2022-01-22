import { createContext, useState } from "react";

export const LocationContext = createContext({
  lat: 34.06,
  lng: -118.44,
  setLat: () => {},
  setLng: () => {},
});

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
