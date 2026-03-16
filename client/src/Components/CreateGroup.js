import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton } from '@mui/material';

function CreateGroup() {
  
  return (
    <div className='createGroups-container'>
      <input placeholder='Masukkan Nama Group' className='search-box' />
      <IconButton>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}

export default CreateGroup