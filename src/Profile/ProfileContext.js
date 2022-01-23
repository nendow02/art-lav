import { createContext, useState } from "react";

export const ProfileContext = createContext({
  isProfileOpen: false,
  setIsProfileOpen: () => {},
});

export const ProfileProvider = (props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    // the Provider gives access to the context to its children
    <ProfileContext.Provider
      value={{
        isProfileOpen,
        setIsProfileOpen,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
