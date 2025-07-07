import React, { useEffect, useState } from "react";
import { AccountCircle, Description, Login, Logout } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Fade, Menu, MenuItem, Modal } from "@mui/material";
import LoginPage from "../pages/LoginPage";
import { UseLocalStorage } from "../sessionStorage/LocalStorage";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constant/constant";
import { useNavigate } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Navbar = ({ tokenId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    setTokenVal,
    open,
    handleOpen,
    handleClose,
    setIsLogin,
    emailVal,
    token,
    nameVal,
    setToken,
    setEmailVal,
    setNameVal
  } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    if (token) {
      setIsLoggedIn(!!token);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken("");
    setEmailVal("");
    setIsLoggedIn(false);
    setTokenVal("");
    setNameVal("");
  };

  const handleVerficationEmailToken = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/email/verifytoken/${tokenId}`);
      const { message } = res.data;
      if (res.data) {
        handleOpen();
        setIsLogin(false);
        toast.success(message || "Email verified successfully");
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong.";
      toast.error(errMsg);
    }
  };
  useEffect(() => {
    if (tokenId) {
      handleVerficationEmailToken();
    }
  }, [tokenId]);

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Description className="text-indigo-600 mr-2" fontSize="small" />
            <span
              onClick={() => navigate(`/`)}
              className="xs:text-base md:text-lg font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight cursor-pointer font-sans"
            >
              SmartResume
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 cursor-pointer">
            <a
              onClick={() => navigate(`/`)}
              className="text-gray-600 hover:text-indigo-600 text-sm transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#resumes"
              className="text-gray-600 hover:text-indigo-600 text-sm transition-colors font-medium"
            >
              Templates
            </a>

            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 text-sm transition-colors font-medium"
            >
              Features
            </a>

            <a
              href="#faq"
              className="text-gray-600 hover:text-indigo-600 text-sm transition-colors font-medium"
            >
              Help
            </a>
          </nav>

          {/* Right Side: Sign In and Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {isLoggedIn ? (
              <div>
                <Button
                  color="info"
                  id="basic-button"
                  aria-controls={open1 ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircle fontSize="medium" className="mr-0 md:mr-1" />
                  {emailVal ? nameVal : "USER"}
                  <ArrowDropDownIcon fontSize="small" className="ml-1" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open1}
                  onClose={handleClose2}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem
                    sx={{
                      fontSize: "14px",
                    }}
                    onClick={handleClose2}
                  >
                    {" "}
                    <AccountCircle
                      fontSize="inherit"
                      className="mr-0 md:mr-1"
                    />{" "}
                    {emailVal}
                  </MenuItem>

                  <MenuItem
                    sx={{
                      fontSize: "14px",
                    }}
                    onClick={handleLogout}
                  >
                    {" "}
                    <Logout fontSize="inherit" className="mr-0 md:mr-1" />{" "}
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <a
                onClick={handleOpen}
                className="text-gray-600 hover:text-indigo-600 text-sm transition-colors font-medium cursor-pointer flex items-center"
              >
                <AccountCircle fontSize="medium" className="mr-0 md:mr-1" />
                <span className="hidden md:inline">Sign In</span>
              </a>
            )}

            <button
              onClick={() => {
                navigate(`/atstester`);
              }}
              className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm items-center cursor-pointer whitespace-nowrap text-xs font-bold"
            >
              <SpeedIcon fontSize="small" className="mr-1" /> ATS SCORE
            </button>
          </div>
        </div>
      </header>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
          className="rounded-4xl"
            sx={style}
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          >
            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                handleClose={handleClose}
                tokenId={tokenId}
                handleOpen={handleOpen}
              />
            </GoogleOAuthProvider>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Navbar;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "none",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
