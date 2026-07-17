import { IconButton, Skeleton } from '@mui/material'
import React, {useEffect, useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { socket } from '../Socket/socket';

function ChatArea() {
  const dyParams = useParams();
  const [messageContent, setMessageContent] = useState("");
  const [convId, fullName] = dyParams.id.split("&");
  const [allMessages, setAllMessages] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [file, setFile] = useState();
  const beURL = process.env.REACT_APP_BE_URL;
  const userData = JSON.parse(localStorage.getItem("userData"))
  let token;
  if(userData) token = userData.data.token

  socket.emit("join-conversation", convId);

  const sendMessage = async () => {
    const filePath = file ? file.path : null;

    if(messageContent.length === 0 && filePath === null) return
    
    // socket.emit("send-message", {
    //   name:"",
    //   senderId: userData.data.currentUser.id,
    //   convId: convId,
    //   content: messageContent,
    //   mediaUrl: filePath,
    //   createdAt: new Date(),
    //   User:{
    //     fullName: userData.data.currentUser.fullName
    //   }
    // })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const formData = new FormData();

    formData.append('messageContent', messageContent);
    formData.append('convId', convId);
    formData.append('image', file);

    const message = formData.get('messageContent');
    const image = formData.get('image');

    const hasMessage = message?.trim() !== '';
    const hasImage = image && image.size > 0;

    if (hasMessage || hasImage) {
      await axios.post(
        `${beURL}/message/`,
        formData,
        config
      );
    }
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    axios.get(`${beURL}/message/` + convId, config)
    .then(({ data }) => {
      setAllMessages(data);
      setloaded(true);
    });
}, [token, convId, beURL]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      setAllMessages((prev) => [
        message,
        ...prev
      ])
    })

  return () => {
    socket.off("receive-message");
  };
}, []);

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else{
    return (
      <div className="chatArea-container">
        <div className="chatArea-header">
          <p className="con-icon">
            {fullName[0]}
          </p>
          <div className="header-text">
            <p className="con-title">
              {fullName}
            </p>
          </div>
          <IconButton className="icon">
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="messages-container">
          {allMessages
            .map((message, index) => {
              const sender = message.senderId;
              const self_id = userData.data.currentUser.id;
              const itsMe = sender === self_id ? true : false;
              let valueMessage = {
                name: "",
                content: message.content,
                mediaUrl: message.mediaUrl,
                createdAt: message.createdAt
              }

              if (itsMe) {
                valueMessage.name = userData.data.currentUser.fullName;
                return <MessageSelf props={valueMessage} key={index} />;
              } else {
                valueMessage.name = message.User.fullName;
                return <MessageOthers props={valueMessage} key={index} />;
              }
            })}
        </div>
        <div className="BOTTOM" />
          <div className="text-input-area">
            <label className="file-input-label">
              <input
                className='file-input'
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <div className="attach-icon">
                <AttachFileIcon />
              </div>
            </label>
            <input
              placeholder="Type a Message"
              className="search-box"
              value={messageContent}
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  sendMessage();
                  setMessageContent("");
                }
              }}
            />
            <IconButton
              className="icon"
              onClick={() => {
                sendMessage();
                setMessageContent("");
              }}
            >
              <SendIcon />
            </IconButton>
        </div>
      </div>
    );
}
}

export default ChatArea