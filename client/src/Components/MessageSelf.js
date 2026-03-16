import React from 'react'
// import "./myStyles.css"

function MessageSelf({props}) {
  const media  = props.mediaUrl !== "Ga ada file nih" ? true : false;
  const files = media ? props.mediaUrl.split("\\") : "kosong";

  return (
    <div className='self-message-container'>
      <div className='messageBox'>
        {media && <img style={{ maxHeight: '250px', maxWidth: '250px' }} src={`http://localhost:5000/${files[1]}`} alt="Media" />}        
        <p>{props.content}</p>
        <p className='self-timeStamp'>{props.updatedAt}</p>
      </div>
    </div>
  )
}

export default MessageSelf