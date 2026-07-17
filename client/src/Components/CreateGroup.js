import React from 'react'
import { Search, AddBox, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateGroup() {
  const navigate = useNavigate();
  const [nameGroup, setNameGroup] = useState("")
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [file, setFile] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const beURL = process.env.REACT_APP_BE_URL;
  const userData = JSON.parse(localStorage.getItem("userData"))
  let token;
  if(userData) token = userData.data.token
  
  useEffect(()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(`${beURL}/users/fetchAllUsers?search=%${searchTerm}`, config)
    .then((response) => {
      const data = response.data.filter((user)=>{ 
          return !addedUsers.some(added => added.fullName === user.fullName)
      })
      setUsers(data)
    })
  }, [token, searchTerm, beURL, addedUsers])

  const addGroup = async()=>{
    const formData = new FormData();
    formData.append('name', nameGroup )
    formData.append('users', JSON.stringify([...addedUsers]) )
    formData.append('image', file )
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(`${beURL}/conversation/createGroup`, formData, config)
    .then((response)=>{
      const convId = response.data.id;
      const nameConversation = response.data.nameConversation;
      navigate("/app/conversation/" + convId + "&" + nameConversation)
    })
  }

  return (
    <div className='createGroups-container'>

      <div className='text-input-area'>
        <label className="file-input-label">
          <input 
            type="file" 
            className='file-input'
            onChange={(e)=>{
              setFile(e.target.files[0])
            }}
          />
          <p className='con-icon'>N</p>
        </label>
        <input placeholder='Masukkan Nama Group' className='search-box' 
          onChange={(e)=>{
            setNameGroup(e.target.value);
          }}
          >
        </input>
        <IconButton 
          onClick={()=>{
            addGroup();
          }
        }>
          <AddBox/>
        </IconButton>
      </div>

      <div className="ug-list row">
        { addedUsers.map((addedUser)=>{
          return <div className="list-item">
            <p className='con-icon'>{addedUser.fullName[0]}</p>
            <p className='con-title'>{addedUser.fullName}</p>
            <IconButton 
              onClick={()=>{
                setAddedUsers(
                  [...addedUsers.filter((added)=> !(added.fullName === addedUser.fullName))]
                )
              }}
            >
              <Clear></Clear>
            </IconButton>
          </div>
        })
        }
      </div>

      <div className="sb-search">
          <IconButton>
            <Search/>
          </IconButton>
          <input placeholder='Tambah' className='search-box'
            value = {searchTerm}
            onChange={(e)=>{
              setSearchTerm(e.target.value)
            }}
          />

      </div>
      <div className="ug-list">
        { users.map((user)=>{
          return <div className='list-item'
          onClick={()=>{
            setAddedUsers([...addedUsers, user])
          }}
          >
            <p className='con-icon'>{user.fullName[0]}</p>
            <p className='con-title'>{user.fullName}</p>
          </div>
        })
        }
      </div>

    </div>
  )
}

export default CreateGroup