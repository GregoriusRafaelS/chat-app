import './myStyles.css';
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function MainContainer() {
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
