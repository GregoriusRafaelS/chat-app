import React, { useEffect } from "react";
import logo from "../images/chat-app-icon.png";
import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

function Welcome() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  
  console.log(userData)
  useEffect(() => {
    console.log("BBBBBBBBBBBBBBBBBBBBB", userData);
    if (!userData) {
      console.log("User not Authenticated");
      navigate('/');
    }
  }, [userData, navigate]);

  return (
    <div className="welcome-container">
      <img src={logo} alt="Logo" className="welcome-logo" />
      <b>Hi , {userData.data.currentUser['fullName']}  👋</b>
      <p>Mulailah berkomunikasi dengan teman teman anda tanpa khawatir terkait keamanan data</p>
    </div>
  );
}

export default Welcome;