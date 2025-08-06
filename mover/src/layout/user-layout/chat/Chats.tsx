import usePopup from "@/hooks/usePopup";
import React from "react";
import { useGetAllChats } from "./chat.api";

import colors from "@/assets/scss/colors.module.scss";
import useAuth from "@/features/auth/utils/useAuth";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import ScaleLoader from "react-spinners/ScaleLoader";
import styles from "./Chats.module.scss";
import OpenedChatBox from "./OpenedChatBox";

const transformChat = (chat: any, userId: any) => {
  const counter_user = chat.users.find((user: any) => user.id !== userId);
  const current_user = chat.users.find((user: any) => user.id === userId);

  return {
    id: chat.id,
    counter_user,
    messages: chat.messages.map((message: any) => ({
      ...message,
      sender: message.user_id === current_user.id ? current_user : counter_user,
    })),
  };
};

const Chats = () => {
  const chatsPopper = usePopup();
  const containerRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, chatsPopper.handleClose);

  const { user, openedChatId, setOpenedChatId } = useAuth();
  const userId = user?.id;
  const { data, isLoading, isError, isSuccess } = useGetAllChats();

  const chats = React.useMemo(() => {
    if (!data) return [];
    return data.map((chat: any) => transformChat(chat, userId));
  }, [data, userId]);

  const openChat = React.useCallback((chatId: number) => {
    setOpenedChatId(chatId);
    chatsPopper.handleClose();
    //eslint-disable-next-line
  }, []);

  const closeChat = React.useCallback(() => {
    setOpenedChatId(null);
  }, []);

  const openedChat = React.useMemo(() => {
    if (!openedChatId) return null;
    return chats.find((chat: any) => chat.id === openedChatId);
  }, [chats, openedChatId]);

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={chatsPopper.handleToggle}
      >
        <IoChatbubbleEllipsesSharp color={colors.text_primary} size={20} />
      </button>
      <div
        ref={containerRef}
        className={styles.popper}
        data-is-open={chatsPopper.isOpen}
      >
        <div className={styles.header}>
          <h5>Chats ({chats.length})</h5>
          <IoMdClose
            color="#000"
            fontSize={24}
            style={{ cursor: "pointer" }}
            onClick={chatsPopper.handleClose}
          />
        </div>
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
            <ScaleLoader color={colors.primary} />
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
        {isSuccess && (
          <div className={styles.content}>
            {chats.length === 0 ? (
              <h6 style={{ padding: "1rem" }}>No Messages </h6>
            ) : (
              <>
                {chats.map((chat: any) => (
                  <div
                    key={chat.id}
                    className={styles.item}
                    onClick={() => openChat(chat.id)}
                  >
                    <p className={styles.title}>
                      {chat?.counter_user?.first_name}{" "}
                      {chat?.counter_user?.last_name}
                    </p>
                    <p className={styles.description}>
                      {chat?.counter_user?.email}
                    </p>
                    <p className={styles.description}>
                      {chat?.counter_user?.phone_number}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      {openedChat && !!openedChatId && (
        <OpenedChatBox
          closeChat={closeChat}
          openedChat={openedChat}
          openedChatId={openedChatId}
          key={openedChat?.id}
        />
      )}
    </>
  );
};

export default Chats;
