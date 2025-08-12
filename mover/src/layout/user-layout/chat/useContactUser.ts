// mover/src/layout/user-layout/chat/useContactUser.ts
import useAuth from "@/features/auth/utils/useAuth";
import React from "react";
import { useCreateChat, useGetAllChats } from "./chat.api";
import { safeFind, safeMap } from "@/utility/arraySafety";

// Ensure input is always an array; otherwise return empty array.
const ensureArray = <T,>(v: T[] | undefined | null): T[] =>
  Array.isArray(v) ? v : [];

const transformChat = (chat: any, userId: any) => {
  const users = ensureArray(chat?.users);
  const messages = ensureArray(chat?.messages);
  
  // Use safe array utilities to prevent TypeError
  const counter_user = safeFind(users, (u: any) => u.id !== userId);
  const current_user = safeFind(users, (u: any) => u.id === userId);

  return {
    id: chat.id,
    counter_user,
    messages: safeMap(messages, (m: any) => ({
      ...m,
      sender:
        m.user_id === current_user?.id ? current_user : counter_user,
    })),
  };
};

const useContactUser = () => {
  const { data } = useGetAllChats();
  const { user, setOpenedChatId } = useAuth();
  const userId = user?.id;

  // Normalize data to an array with proper safety checks
  const chats = React.useMemo(() => {
    if (!data || !userId) return [];
    const chatArray = Array.isArray(data) ? data : [];
    return safeMap(chatArray, (chat: any) => transformChat(chat, userId));
  }, [data, userId]);

  // ...existing logic...
};

export default useContactUser;
