import React from "react";
import { safeMap, hasItems } from "@/utility/arraySafety";

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
        {!hasItems(messages) ? (
          <p>No messages yet</p>
        ) : (
          safeMap(messages, (message: any, index: number) => (
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
