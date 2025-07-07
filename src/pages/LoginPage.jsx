import React, { useState } from "react";
import { Card, TextField, Button, Typography, Link, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Email } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constant/constant";
import { UseLocalStorage } from "../sessionStorage/LocalStorage";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = ({ setIsLoggedIn, handleClose, tokenId }) => {
  //  const [isLogin, setIsLogin] = useState(true);

  const { isLogin, setIsLogin, setTokenVal, setNameVal, setEmailVal } =
    useAuth();
  const [loginVal, setLoginVal] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const showPassword = isLogin || (!isLogin && tokenId);
  const [token, setToken] = UseLocalStorage("token", "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginVal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !loginVal.email.trim() || showPassword ? !loginVal.password.trim() : null
    ) {
      toast.error("All fields are required");
      return;
    }

    const url = isLogin
      ? `${BASE_URL}/auth/login`
      : tokenId
        ? `${BASE_URL}/auth/Signup`
        : `${BASE_URL}/email/verifyemail`;

    try {
      setLoading(true);
      const res = await axios.post(url, loginVal);
      const { success, message, jwtToken, email } = res.data;

      if (success) {
        toast.success(message);
        if (!isLogin) {
          handleClose();
          navigate("/");
          return;
        }
        setToken(jwtToken);
        setEmailVal(email);
        setIsLoggedIn(true);
        setTokenVal(jwtToken);
        setLoading(false);
        handleClose();
      } else {
        toast.error(message || "Something went wrong.");
      }
    } catch (err) {
      setLoading(false);
      const detailsMsg =
        err.response?.data?.error?.details?.[0]?.message ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred.";
      toast.error(detailsMsg);
    }
  };

  const handleGoogleLogin = async (credentials) => {
    const url = `${BASE_URL}/auth/login`;

    try {
      setLoading(true);
      const res = await axios.post(url, { googleAuth: credentials });
      const { success, message, jwtToken, email, name } = res.data;

      if (success) {
        toast.success(message);
        if (!isLogin) {
          handleClose();
          navigate("/");
          return;
        }
        setToken(jwtToken);
        setEmailVal(email);
        setNameVal(name);
        setIsLoggedIn(true);
        setTokenVal(jwtToken);
        setLoading(false);
        handleClose();
      } else {
        toast.error(message || "Something went wrong.");
      }
    } catch (err) {
      setLoading(false);
      const detailsMsg =
        err.response?.data?.error?.details?.[0]?.message ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred.";
      toast.error(detailsMsg);
    }
  };

  return (
    <Card
      className="w-full max-w-md p-8 shadow-lg rounded-4xl"
      data-aos="fade-up"
    >
      <div className="flex mb-6 rounded-4xl p-5">
        <LockOutlinedIcon className="text-gray-900" style={{ fontSize: 30 }} />

        <p className="text-start text-2xl font-semibold tracking-wide">
          {isLogin ? "Log In" : "Sign Up"}
        </p>
      </div>

      <div className="space-y-4">
        <TextField
          name="email"
          value={loginVal.email}
          onChange={handleChange}
          fullWidth
          label={
            <Box display="flex" alignItems="center">
              <Email fontSize="small" style={{ marginRight: 4 }} />
              Email
            </Box>
          }
          variant="outlined"
          size="medium"
          InputProps={{
            className: "rounded-lg mb-4",
          }}
        />

        <TextField
          name="password"
          value={loginVal.password}
          onChange={handleChange}
          fullWidth
          label={
            <Box display="flex" alignItems="center">
              <RemoveRedEyeIcon fontSize="small" style={{ marginRight: 4 }} />
              Password
            </Box>
          }
          type="password"
          variant="outlined"
          size="medium"
          hidden={!showPassword}
          InputProps={{
            className: "rounded-lg mb-4",
          }}
        />

        <button
          onClick={handleSubmit}
          className={`py-3 w-30 rounded-4xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
          disabled={loading}
        >
          {isLogin ? "Log In" : tokenId ? "Sign Up" : "Verify Email"}
        </button>
      </div>

      {isLogin ? (
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => setIsLogin(false)}
            className="text-blue-600 hover:text-blue-800 mt-4 cursor-pointer"
          >
            Open Account
          </span>
        </p>
      ) : (
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => setIsLogin(true)}
            className="text-blue-600 hover:text-blue-800 mt-4 cursor-pointer"
          >
            login
          </span>
        </p>
      )}
      
        <div className="flex justify-center item-center mt-3">
          <GoogleLogin
          text={"continue_with"}
            width={250}
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
    </Card>
  );
};

export default LoginPage;
