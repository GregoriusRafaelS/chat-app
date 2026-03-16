import React, { useEffect, useState } from "react";
import logo from "../images/chat-app-icon.png";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

function Login() {
  const [showlogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = useState("");
  const [signInStatus, setSignInStatus] = useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/users/login/",
        data,
        config
      );
      console.log("Login : ", response);
      setLogInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLogInStatus({
        msg: "Periksa kembali email atau password anda",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  const signUpHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/users/register",
        data,
        config
      );

      setSignInStatus({ msg: "Berhasil Mendaftar", key: Math.random() });
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      if (error.response.status === 400) {
        setSignInStatus({
          msg: "Isi seluruh form yang ada",
          key: Math.random(),
        });
      }
      if (error.response.status === 405) {
        setSignInStatus({
          msg: "email telah dipakai, gunakan email lainnya",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setSignInStatus({
          msg: "Username telah dipakai, gunakan username lainnya",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("signInStatus changed:", signInStatus);
  }, [signInStatus, setLogInStatus]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
        {showlogin && (
          <div className="login-box">
            <p className="login-text">Masukkan Akun Anda</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Masukkan email anda"
              variant="outlined"
              color="secondary"
              name="email"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  loginHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  loginHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={loginHandler}
            >
              Masuk
            </Button>
            <p>
              Belum Memiliki Akun ?{" "}
              <span
                className="hyper"
                onClick={() => {
                  setLogInStatus();
                  setShowLogin(false);
                }}
              >
                Daftar
              </span>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
          </div>
        )}
        {!showlogin && (
          <div className="login-box">
            <p className="login-text">Daftar Sekarang Juga !</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Masukkan Nama Anda"
              variant="outlined"
              color="secondary"
              name="fullName"
              helperText=""
              onKeyDown={ (event) => {
                if (event.code === "Enter") {
                   signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Masukkan Email Anda"
              variant="outlined"
              color="secondary"
              name="email"
              onKeyDown={ (event) => {
                if (event.code === "Enter") {
                   signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                   signUpHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={()=>{
                 signUpHandler();
                // setShowLogin(true);
              }}
            >
              Daftar
            </Button>
            <p>
              Sudah Memiliki Akun ?
              <span
                className="hyper"
                onClick={() => {
                  setSignInStatus();
                  setShowLogin(true);
                }}
              >
                Masuk
              </span>
            </p>            
            {signInStatus && (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;