import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import logo from "../images/chat-app-icon.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Users() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const beURL = process.env.REACT_APP_BE_URL;
  let token;
  if(userData) token = userData.data.token;
  
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(`${beURL}/users/fetchAllUsers?search=%${searchTerm}`, config)
    .then((response) => {
      console.log("User data refreshed in Users panel");
      setUsers(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, [token, searchTerm, beURL]);

  return (
    <div className='list-container'>
      <div className="ug-header">
        <img 
        src={logo} alt="Logo" 
        style={{height: "2rem", width:"2rem", marginLeft:"10px"}}/>
      <p className='ug-title'>Cari Akun</p>
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

      <div className='ug-list'>
      {users.map((user, index) => {
            return (
              <div
                className={"list-item" }
                key={index}
                onClick={() => {
                  console.log("Memulai chat dengan ", user.fullName);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  axios.post(
                    `${beURL}/conversation`,
                    {
                      userId: user.id,
                      type: 'Personal'
                    },
                    config
                  )
                  .then((response) => {
                    const data = response.data;

                    const convId = data.id;
                    navigate("/app/conversation/" + convId + "&" + user.fullName)
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
                }
              }
              >
                <p className={"con-icon" }>{user.fullName[0]}</p>
                <p className={"con-title" }>
                  {user.fullName}
                </p>
              </div>

            );
      })}
        {/* <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div>
        <div className='list-item'>
          <p className='con-icon'></p>
          <p className='con-title'>Test User</p>
        </div> */}
      </div>

    </div>
  )
}

export default Users