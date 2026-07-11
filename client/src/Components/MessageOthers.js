import React from 'react'
// import "./myStyles.css"

function MessageOthers({props}) {
  const media  = props.mediaUrl !== null ? true : false;
  const files = media ? props.mediaUrl.split("\\") : "kosong";
  const beURL = process.env.REACT_APP_BE_URL;

  return (
    <div className='other-message-container'>
      <div className='conversation-container'>
        <p className='con-icon'>{props.name[0]}</p>
        <div className='other-text-content'>
          <p className='con-title'>{props.name}</p>
          {media && <img style={{ maxHeight: '250px', maxWidth: '250px' }} src={`${beURL}/${files[1]}`} alt="Media" />}        
          <p className='con-message'>{props.content}</p>
          <p className='self-timeStamp'>{new Date(props.createdAt).toLocaleString('id-ID')}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageOthers