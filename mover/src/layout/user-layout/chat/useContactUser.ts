// mover/src/layout/user-layout/chat/useContactUser.ts
import useAuth from "@/features/auth/utils/useAuth";
import React from "react";
import { useCreateChat, useGetAllChats } from "./chat.api";

// Ensure input is always an array; otherwise return empty array.
const ensureArray = <T,>(v: T[] | undefined | null): T[] =>
  Array.isArray(v) ? v : [];

const transformChat = (chat: any, userId: any) => {
  const users = ensureArray(chat?.users);
  const messages = ensureArray(chat?.messages);
  const counter_user = users.find((u: any) => u.id !== userId);
  const current_user = users.find((u: any) => u.id === userId);

  return {
    id: chat.id,
    counter_user,
    messages: messages.map((m: any) => ({
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

  // Normalize data to an array
  const chats = React.useMemo(() => {
    if (!data) return [];
    const chatArray = Array.isArray(data) ? data : [];
    return chatArray.map((chat: any) => transformChat(chat, userId));
  }, [data, userId]);

  // ...existing logic...
};

export default useContactUser;
