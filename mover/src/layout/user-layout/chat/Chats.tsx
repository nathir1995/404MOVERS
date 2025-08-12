import usePopup from "@/hooks/usePopup";
import React from "react";
import { useGetAllChats } from "./chat.api";
import { safeFind, safeMap, hasItems } from "@/utility/arraySafety";

import colors from "@/assets/scss/colors.module.scss";
import useAuth from "@/features/auth/utils/useAuth";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import ScaleLoader from "react-spinners/ScaleLoader";
import styles from "./Chats.module.scss";
import OpenedChatBox from "./OpenedChatBox";

/**
 * Safely transform a chat object by ensuring the `users` and `messages`
 * properties are defined before calling `.find()` or `.map()`. Without this
 * guard, the page crashes with `TypeError: Cannot read properties of undefined`.
 */
const transformChat = (chat: any, userId: any) => {
  // Default to empty arrays if chat.users or chat.messages are undefined
  const users: any[] = Array.isArray(chat?.users) ? chat.users : [];
  const messages: any[] = Array.isArray(chat?.messages) ? chat.messages : [];

  // Use safe array utilities to prevent TypeError
  const counter_user = safeFind(users, (user: any) => user.id !== userId);
  const current_user = safeFind(users, (user: any) => user.id === userId);

  // Map messages and attach the sender; fallback to counter_user if no current_user
  const mappedMessages = safeMap(messages, (message: any) => {
    const isFromCurrentUser =
      current_user && message.user_id === current_user.id;
    return {
      ...message,
      sender: isFromCurrentUser ? current_user : counter_user,
    };
  });

  return {
    id: chat.id,
    counter_user,
    messages: mappedMessages,
  };
};

const Chats = () => {
  const chatsPopper = usePopup();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef, chatsPopper.handleClose);

  const { user, openedChatId, setOpenedChatId } = useAuth();
  const userId = user?.id;
  const { data, isLoading, isError, isSuccess } = useGetAllChats();

  // Safely transform the chats array with proper safety checks
  const chats = React.useMemo(() => {
    if (!data || !userId) return [];
    return safeMap(data, (chat: any) => transformChat(chat, userId));
  }, [data, userId]);

  const openChat = React.useCallback(
    (chatId: number) => {
      setOpenedChatId(chatId);
      chatsPopper.handleClose();
      // eslint-disable-next-line
    },
    [setOpenedChatId, chatsPopper]
  );

  const closeChat = React.useCallback(() => {
    setOpenedChatId(null);
  }, [setOpenedChatId]);

  // Find the opened chat safely using safe array utilities
  const openedChat = React.useMemo(() => {
    if (!openedChatId || !hasItems(chats)) return null;
    return safeFind(chats, (chat: any) => chat.id === openedChatId);
  }, [chats, openedChatId]);

  return (
    <>
      {/* Chat trigger icon and indicator */}
      <div onClick={() => chatsPopper.handleOpen()}>
        <IoChatbubbleEllipsesSharp color={colors.primary} size={20} />
        Chats ({chats.length})
      </div>
      {isLoading && (
        <ScaleLoader color={colors.primary} height={15} margin={2} width={2} />
      )}
      {isError && (
        <div>An error occurred, please refresh the page and try again.</div>
      )}
      {isSuccess && (
        <>
          {!hasItems(chats) ? (
            <div>No Messages</div>
          ) : (
            <>
              {safeMap(chats, (chat: any) => (
                <div
                  key={chat.id}
                  onClick={() => openChat(chat.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Show the other participant's name (if available) */}
                  {chat?.counter_user?.first_name} {chat?.counter_user?.last_name}
                  <br />
                  {chat?.counter_user?.email}
                  <br />
                  {chat?.counter_user?.phone_number}
                </div>
              ))}
            </>
          )}
        </>
      )}
      {/* Opened chat dialog */}
      {openedChat && !!openedChatId && (
        <OpenedChatBox
          openedChat={openedChat}
          openedChatId={openedChatId}
          closeChat={closeChat}
        />
      )}
    </>
  );
};

export default Chats;
