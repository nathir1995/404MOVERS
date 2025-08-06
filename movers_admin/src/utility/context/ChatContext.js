import { Drawer } from "@mui/material";
import { useGetAllChats } from "api/chat";
import ChatSideDrawerContent from "components/chat/ChatSideDrawerContent";
import OpenedChatBox from "components/chat/OpenedChatBox";
import { useModal } from "hooks";
import React from "react";
import { Spinner } from "reactstrap";
import { useAuth } from "store/auth/useAuth";

const ChatContext = React.createContext();
export const useChatContext = () => React.useContext(ChatContext);

// const transformChat = (chat, userId) => {
//   const counter_user = chat.users.find((user) => user.id !== userId);
//   const current_user = chat.users.find((user) => user.id === userId);

//   return {
//     id: chat.id,
//     counter_user,
//     messages: chat.messages.map((message) => ({
//       ...message,
//       sender: message.user_id === current_user.id ? current_user : counter_user,
//     })),
//   };
// };

const transformChat = (chat, userId) => {
  const counter_user = chat.pivot.user_id === userId ? null : { id: chat.pivot.user_id };
  const current_user = chat.pivot.user_id === userId ? { id: userId } : null;

  return {
    id: chat.id,
    counter_user,
    messages: chat.messages.map((message) => ({
      ...message,
      sender: message.user_id === current_user.id ? current_user : counter_user,
    })),
  };
};

const ChatContextProvidor = ({ children }) => {
  const { isOpen, closeModal, openModal } = useModal(false);
  const [openedChatId, setOpenendChatId] = React.useState(null);

  const { user } = useAuth();
  const userId = user.id;
  const { data, isLoading, isError, isSuccess } = useGetAllChats();
  const chats = React.useMemo(() => {
    if (!data) return [];
    return data.map((chat) => transformChat(chat, userId));
  }, [data, userId]);

  const openChat = React.useCallback((chatId) => {
    setOpenendChatId(chatId);
    closeModal();
    //eslint-disable-next-line
  }, []);
  const closeChat = React.useCallback(() => {
    setOpenendChatId(null);
  }, []);
  const openedChat = React.useMemo(() => {
    if (!openedChatId) return null;
    return chats.find((chat) => chat.id === openedChatId);
  }, [chats, openedChatId]);

  const memoedValue = React.useMemo(
    () => ({
      openModal,
      chats,
      openChat,
      closeChat,
      openedChatId,
      openedChat,
    }),
    //eslint-disable-next-line
    [chats, openedChatId, openedChat]
  );

  return (
    <ChatContext.Provider value={memoedValue}>
      {children}
      {openedChat && <OpenedChatBox key={openedChat?.id} />}
      <Drawer
        open={isOpen}
        onClose={closeModal}
        anchor="right"
        PaperProps={{
          sx: {
            width: "min(100%, 300px)",
          },
        }}
      >
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Spinner />
          </div>
        )}
        {isError && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <h6 style={{ textAlign: "center", color: "red" }}>
              An Error occured, Please refresh the page and try again
            </h6>
          </div>
        )}
        {isSuccess && <ChatSideDrawerContent />}
      </Drawer>
    </ChatContext.Provider>
  );
};

const ChatContextProvidorWithAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated)
    return <ChatContextProvidor>{children}</ChatContextProvidor>;
  return children;
};

export default ChatContextProvidorWithAuth;
