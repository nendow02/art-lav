import { createContext, useState } from "react";

export const LocationContext = createContext({
  lat: 34.06,
  lng: -118.44,
  setLat: () => {},
  setLng: () => {},
  isMapOpen: true,
  setIsMapOpen: () => {},
  newAccount: false,
  setNewAccount: () => {},
});

export const LocationProvider = (props) => {
  const [lat, setLat] = useState(34.06);
  const [lng, setLng] = useState(-118.44);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [newAccount, setNewAccount] = useState(false);
  return (
    // the Provider gives access to the context to its children
    <LocationContext.Provider
      value={{
        lat,
        lng,
        setLat,
        setLng,
        isMapOpen,
        setIsMapOpen,
        newAccount,
        setNewAccount,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
