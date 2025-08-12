import React from "react";

// Define the interface for props
interface IProps {
  openedChat: any;
  openedChatId: string | number;
  closeChat: () => void;
}

const OpenedChatBox = ({ openedChat, openedChatId, closeChat }: IProps) => {
  // If counter_user is undefined, provide empty defaults to avoid
  // reading properties of undefined.
  const counterUser = openedChat?.counter_user || {};
  const messages = openedChat?.messages || [];

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h4>
          {counterUser.first_name || "Unknown"} {counterUser.last_name || "User"}
        </h4>
        <button onClick={closeChat}>Close</button>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((message: any, index: number) => (
            <div key={message.id || index} className="message">
              <p>{message.content || ""}</p>
            </div>
          ))
        )}
      </div>
      
      <div className="chat-input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default OpenedChatBox;
