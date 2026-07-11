import './myStyles.css';
import Sidebar from "./Sidebar";
import { Outlet, Navigate } from "react-router-dom";

function MainContainer() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  let token
  if(userData) token = userData.data.token;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="main-container">
    <Sidebar />
    <Outlet />
    {/* <Welcome /> */}
    {/* <CreateGroup /> */}
    {/* <ChatArea props={conversations[0]} />  */}
    {/* {conversations.map((conversation) => {
      return <ChatArea props={conversation} key={conversation.name} />
    })} */}
    
    </div>


  );
}

export default MainContainer;
