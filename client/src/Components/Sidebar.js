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
import { useCallback } from 'react';

function Sidebar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const beURL = process.env.REACT_APP_BE_URL;

  let token;
  if(userData) token = userData.data.token
  
  const searchConversation = useCallback(async () => {
    const response = await axios.get(
      `${beURL}/conversation`,{
      params: { searchTerm: searchTerm }, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setConversations(response.data);
  }, [token, searchTerm, beURL]);

  useEffect(() => {
    searchConversation()
  }, [searchConversation]);

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
          // if (conversation.length === 1) {
          //   return <div key={index}></div>;
          // }
          
          return (
            <div
            key={index}
            className="conversation-container"
            onClick={() => {
              navigate(
                "conversation/" +
                  conversation.conversationId +
                  "&" +
                  conversation.fullName
              );
            }}
            >
              <p className='con-icon'>{conversation.fullName[0]}</p>
              <p className='con-title'>{conversation.fullName}</p>
               <p className='con-lastMessage'>{conversation.messages.length > 30 ? `${conversation.messages.substring(0, 30)}...` : conversation.content}</p>
              <p className='con-timeStamp'>{new Date(conversation.updatedAt).toLocaleString('id-ID')}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Sidebar