import React, { useContext, useState } from "react";
import { createContext } from "react";
import { UseLocalStorage } from "../sessionStorage/LocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
// State to manage token value
// Using custom hook to manage local storage
const [tokenVal, setTokenVal] = UseLocalStorage('tokenVal', "");
const [emailVal, setEmailVal] = UseLocalStorage("email", "");
  const [token, setToken] = UseLocalStorage("token", "");
  const [nameVal, setNameVal] = UseLocalStorage('name', "")

// State to manage modal open/close
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State to manage login state and register state in login page
  const [isLogin, setIsLogin] = useState(true);

return (
    <AuthContext.Provider value={{ tokenVal, setTokenVal, handleOpen, handleClose, open, isLogin, setIsLogin, emailVal, setEmailVal,nameVal, setNameVal, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use context easily
export const useAuth = () => useContext(AuthContext);