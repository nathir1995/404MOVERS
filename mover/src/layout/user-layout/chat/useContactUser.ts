import useAuth from "@/features/auth/utils/useAuth";
import React from "react";
import { useCreateChat, useGetAllChats } from "./chat.api";

// Ensure input is always an array; fall back to an empty array when undefined or null.
const ensureArray = <T,>(v: T[] | undefined | null): T[] =>
  Array.isArray(v) ? v : [];

const transformChat = (chat: any, userId: any) => {
  const users = ensureArray(chat?.users);
  const messages = ensureArray(chat?.messages);
  const counter_user = users.find((user: any) => user.id !== userId);
  const current_user = users.find((user: any) => user.id === userId);

  return {
    id: chat.id,
    counter_user,
    messages: messages.map((message: any) => ({
      ...message,
      sender:
        message.user_id === current_user?.id ? current_user : counter_user,
    })),
  };
};

const useContactUser = () => {
  const { data, isSuccess } = useGetAllChats();
  const { user, setOpenedChatId } = useAuth();
  const userId = user?.id;

  // Normalise `data` to an array to avoid calling `.map()` on undefined
  const chats = React.useMemo(() => {
    if (!data) return [];
    const chatArray = Array.isArray(data) ? data : [];
    return chatArray.map((chat: any) => transformChat(chat, userId));
  }, [data, userId]);

  const { mutate: createChat, isLoading } = useCreateChat({
    onSuccess: (data: any) => {
      const chatId = data?.data?.id;
      if (chatId) {
        setOpenedChatId(chatId);
      }
    },
  });

  const handleContact = (user_id: number) => {
    if (!isSuccess) return;
    const chatExists = chats.find(
      (chat: any) => chat?.counter_user?.id === user_id
    );
    if (chatExists) {
      setOpenedChatId(chatExists.id);
    } else {
      createChat({ user_id });
    }
  };

  return {
    handleContact,
    canContact: isSuccess,
    isCreatingChat: isLoading,
    chats,
  };
};

export default useContactUser;
