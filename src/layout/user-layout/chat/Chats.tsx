import usePopup from "@/hooks/usePopup";
import React from "react";
import { useGetAllChats } from "./chat.api";
import { safeFind, safeMap } from "@/utility/arraySafety";

import colors from "@/assets/scss/colors.module.scss";
import useAuth from "@/features/auth/utils/useAuth";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import ScaleLoader from "react-spinners/ScaleLoader";
import styles from "./Chats.module.scss";
import OpenedChatBox from "./OpenedChatBox";

const transformChat = (chat: any, userId: any) => {
  const users = Array.isArray(chat.users) ? chat.users : [];
  // Use safe array utilities to prevent TypeError
  const counter_user = safeFind(users, (user: any) => user.id !== userId);
  const current_user = safeFind(users, (user: any) => user.id === userId);

  return {
    id: chat.id,
    counter_user,
    messages: Array.isArray(chat.messages)
      ? safeMap(chat.messages, (message: any) => ({
          ...message,
          sender: message.user_id === current_user?.id ? current_user : counter_user,
        }))
      : [],
  };
};

const Chats = () => {
  const chatsPopper = usePopup();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef, chatsPopper.handleClose);

  const { user, openedChatId, setOpenedChatId } = useAuth();
  const userId = user?.id;
  const { data, isLoading, isError, isSuccess } = useGetAllChats();

  const chats = React.useMemo(() => {
    if (!Array.isArray(data)) return [];
    return safeMap(data, (chat: any) => transformChat(chat, userId));
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
    // Use safe array utilities to prevent TypeError
    return safeFind(chats, (chat: any) => chat.id === openedChatId);
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
        {/* ...rest of your render logic */}
      </div>
    </>
  );
};

export default Chats;