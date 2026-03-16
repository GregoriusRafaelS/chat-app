import React, {useEffect, useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [conversations, setConversations] = useState([]);

  
  useEffect(() => {
    if (!userData) {
      console.log("User not Authenticated");
      navigate('/');
      
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.get(`http://localhost:5000/chat?search=%${searchTerm}`, config)
    .then((response) => {
      // console.log("User data refreshed in Users panel");
      setConversations(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, [searchTerm, userData, navigate]);
  return (
    <div className="sidebar-container">
      <div className="sb-header">
        <div>
          <IconButton>
          <AccountCircleIcon />
          </IconButton>
        </div>

        <div>
          <IconButton 
          onClick={() => {
            navigate('users');
        }}
        >
            <PersonAddIcon />
          </IconButton>
          <IconButton 
          onClick={() => {
            navigate('groups');
        }}
        >
            <GroupAddIcon />
          </IconButton>
          <IconButton 
          onClick={() => {
            navigate('create-groups');
        }}
        >
            <AddCircleIcon />
          </IconButton>
          <IconButton 
          onClick={() => {
            localStorage.removeItem("userData");
            navigate('/');
        }}
        >
            <LogoutIcon />
          </IconButton>
        </div>
      </div>

      <div className="sb-search">
        <IconButton />
          <SearchIcon />
        <IconButton />
        <input placeholder="search" className="search-box" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sb-conversation">
        {conversations.map((conversation, index) => {
          if (conversation.length === 1) {
            return <div key={index}></div>;
          }
          if (conversation.messages.length === 0) {
            return (
              <div
              key={index}
              onClick={() => {
                console.log("Refresh fired from sidebar");
                // dispatch(refreshSidebarFun());
                // setRefresh(!refresh);
                }}
                >
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    const config = {
                      headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                      },
                    };
                    axios.get(
                      `http://localhost:5000/chat?chatId=${conversation.chatId}?fullName=${conversation.fullName}`,
                      config
                    )
                    .then((response) => console.log(response.data));
                    navigate(
                      "chat/" +
                        conversation.chatId +
                        "&" +
                        conversation.fullName
                        );
                      }}
                      >
                  <p className="con-icon">
                    {conversation.fullName[0]}
                  </p>
                  <p className="con-title">
                    {conversation.fullName}
                  </p>

                  <p className="con-lastMessage">
                    Belum ada obrolan, mulai sekarang juga ...
                  </p>
                </div>
              </div>
            );
          }else{
            return (
              <div
              key={index}
              className="conversation-container"
              onClick={() => {
                navigate(
                  "chat/" +
                    conversation.chatId +
                    "&" +
                    conversation.fullName
                );
              }}
              >
                <p className='con-icon'>{conversation.fullName[0]}</p>
                <p className='con-title'>{conversation.fullName}</p>
                 <p className='con-lastMessage'>{conversation.messages[0].content.length > 30 ? `${conversation.messages[0].content.substring(0, 30)}...` : conversation.messages[0].content}</p>
                {/* <p className='con-lastMessage'>{conversation.messages[0].content}</p> */}
                <p className='con-timeStamp'>{conversation.messages[0].updatedAt}</p>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
}

export default Sidebar