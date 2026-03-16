import React from 'react'
// import "./myStyles.css"

function MessageOthers({props}) {
  const media  = props.mediaUrl !== "Ga ada file nih" ? true : false;
  const files = media ? props.mediaUrl.split("\\") : "kosong";
  return (
    <div className='other-message-container'>
      <div className='conversation-container'>
        <p className='con-icon'>{props.name[0]}</p>
        <div className='other-text-content'>
          <p className='con-title'>{props.name}</p>
        {media && <img style={{ maxHeight: '250px', maxWidth: '250px' }} src={`http://localhost:5000/${files[1]}`} alt="Media" />}        
          {/* {props.mediaUrl && <img style={{ maxHeight: '250px', width: 'auto' }} src={`http://localhost:5000/${files[1]}`} alt="Media" />} */}
          <p className='con-message'>{props.content}</p>
          <p className='self-timeStamp'>{props.updatedAt}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageOthers