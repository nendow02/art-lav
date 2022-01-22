import { createContext, useState } from "react";

export const AuthContext = createContext({
  id: 0,
  setid: () => {},
  isSignedIn: true,
  setIsSignedIn: () => {},
});

export const AuthProvider = (props) => {
  const [id, setid] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    // the Provider gives access to the context to its children
    <AuthContext.Provider
      value={{ id, setid,isSignedIn, setIsSignedIn}}
    >
      {props.children}
    </AuthContext.Provider>
  );
};