import React from 'react'

function MessageSelf({props}) {
  const media  = props.mediaUrl !== null ? true : false;
  const files = media ? props.mediaUrl.split("\\") : "kosong";
  const beURL = process.env.REACT_APP_BE_URL;

  return (
    <div className='self-message-container'>
      <div className='messageBox'>
        {media && <img style={{ maxHeight: '250px', maxWidth: '250px' }} src={`${beURL}/${files[1]}`} alt="Media" />}        
        <p>{props.content}</p>
        <p className='self-timeStamp'>{new Date(props.createdAt).toLocaleString('id-ID')}</p>
      </div>
    </div>
  )
}

export default MessageSelf