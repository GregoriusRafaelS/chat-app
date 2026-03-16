import React from "react";
import './App.css';
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import ChatArea from "./Components/ChatArea";
import CreateGroup from "./Components/CreateGroup";
import Groups from "./Components/Groups";
import Users from "./Components/Users";

function App() {
  return (
    <div className="App">
    {/* <MainContainer /> */}
    {/* <Login /> */}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="app" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome/>}></Route>
          <Route path="chat/:id" element={<ChatArea/>}></Route>
          <Route path="users" element={<Users/>}></Route>
          <Route path="groups" element={<Groups/>}></Route>
          <Route path="create-groups" element={<CreateGroup/>}></Route>
        </Route>
    </Routes>
    </div>
  );
}

export default App;