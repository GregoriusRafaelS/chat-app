import { IconButton, Skeleton } from '@mui/material'
import React, {useEffect, useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const userData = JSON.parse(localStorage.getItem("userData"));

function ChatArea() {
  const navigate = useNavigate();
  const dyParams = useParams();
  const [messageContent, setMessageContent] = useState("");
  const [chatId, fullName] = dyParams.id.split("&");
  const [allMessages, setAllMessages] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [file, setFile] = useState();

  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }

  const sendMessage = () => {
    // console.log("SendMessage Fired to", chat_id._id);
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    
    const formData = new FormData();
    formData.append('content', messageContent)
    formData.append('chatId', chatId)
    formData.append('fullName', fullName)
    formData.append('image', file)
    axios
      .post(
        "http://localhost:5000/message/",
        formData,
        config
      )
      .then(({ data }) => {
        console.log("Message Fired");
      });
  };

  const user = userData.data;
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get("http://localhost:5000/message/" + chatId, config)
    .then(({ data }) => {
      setAllMessages(data);
      console.log(allMessages)
      setloaded(true);
      // console.log("Data from Acess Chat API ", data);
    });
  // scrollToBottom();
}, [chatId]);

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
              const sender = message.sender.id;
              const self_id = userData.data.currentUser.id;
              const itsMe = sender === self_id ? true : false;
              let valueMessage = {
                name: "Siapa aku kwkwk",
                content: message.content,
                mediaUrl: message.mediaUrl,
                updatedAt: message.updatedAt
              }

              if (itsMe) {
                valueMessage.name = userData.data.currentUser.fullName;
                return <MessageSelf props={valueMessage} key={index} />;
              } else {
                valueMessage.name = message.sender.fullName;
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