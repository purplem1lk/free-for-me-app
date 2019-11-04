import Moment from "react-moment";
import React, { useState, useEffect } from "react";
import { withChatkitOneToOne } from "@pusher/chatkit-client-react";

import defaultAvatar from "./default-avatar.png";

function Chat(props) {
  const [pendingMessage, setPendingMessage] = useState("");
  const messageList = React.createRef();

  const handleMessageKeyDown = event => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleMessageChange = event => {
    setPendingMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (pendingMessage === "") {
      return;
    }
    props.chatkit.sendSimpleMessage({ text: pendingMessage });
    setPendingMessage("");
  };

  useEffect(() => {
    messageList.current.scrollTop = messageList.current.scrollHeight;
  });

  const messages = props.chatkit.messages.map(m => ({
    id: m.id,
    isOwnMessage: m.sender.id === props.chatkit.currentUser.id,
    createdAt: m.createdAt,
    textContent: m.parts[0].payload.content
  }));

  // is there an array of messages at all && is there a length to the messages array
  if (props.chatkit.messages && props.chatkit.messages.length) {
    const lastMessageIndex = props.chatkit.messages.length - 1;
    // tell chatkit we read up to the last message in the conversation (lastMessageIndex). setReadCursor is given from chatkit and wants to know what room the messages are from and what message is the last one that was opened
    props.chatkit.setReadCursor({
      roomId: props.chatkit.messages[lastMessageIndex].roomId,
      messageId: props.chatkit.messages[lastMessageIndex].id
    });
  }

  return (
    <div className="Chat">
      <div className="Chat__titlebar">
        <img
          src={defaultAvatar}
          className="Chat__titlebar__avatar"
          alt="avatar"
        />
        <div className="Chat__titlebar__details">
          <span>
            {props.chatkit.isLoading
              ? "Loading..."
              : props.chatkit.otherUser.name}
          </span>
        </div>
      </div>
      <div className="Chat__messages" ref={messageList}>
        {messages.map(m => (
          <Message key={m.id} {...m} />
        ))}
      </div>
      <div className="Chat__compose">
        <input
          className="Chat__compose__input"
          type="text"
          placeholder="Type a message..."
          value={pendingMessage}
          onChange={handleMessageChange}
          onKeyDown={handleMessageKeyDown}
        />
        <button className="Chat__compose__button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

function Message({ isOwnMessage, isLatestMessage, createdAt, textContent }) {
  return (
    <div
      className={
        isOwnMessage
          ? "Chat__messages__message__wrapper Chat__messages__message__wrapper--self"
          : "Chat__messages__message__wrapper Chat__messages__message__wrapper--other"
      }
    >
      <div className="Chat__messages__message__wrapper__inner">
        <div
          className={
            isOwnMessage
              ? "Chat__messages__message Chat__messages__message--self"
              : "Chat__messages__message Chat__messages__message--other"
          }
        >
          <div className="Chat__messages__message__content">{textContent}</div>
          <div className="Chat__messages__message__time">
            <Moment
              calendar={{
                sameDay: "LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[last] dddd [at] LT"
              }}
            >
              {createdAt}
            </Moment>
          </div>
          <div
            className={
              isOwnMessage
                ? "Chat__messages__message__arrow alt"
                : "Chat__messages__message__arrow"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default withChatkitOneToOne(Chat);
