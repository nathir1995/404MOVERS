import useAuth from "@/features/auth/utils/useAuth";
import React from "react";
import { useCreateChat, useGetAllChats } from "./chat.api";

const transformChat = (chat: any, userId: any) => {
  const users = Array.isArray(chat.users) ? chat.users : [];
  const counter_user = users.find((user: any) => user.id !== userId);
  const current_user = users.find((user: any) => user.id === userId);

  return {
    id: chat.id,
    counter_user,
    messages: Array.isArray(chat.messages)
      ? chat.messages.map((message: any) => ({
          ...message,
          sender: message.user_id === current_user?.id ? current_user : counter_user,
        }))
      : [],
  };
};

const useContactUser = () => {
  const { data, isSuccess } = useGetAllChats();
  const { user, setOpenedChatId } = useAuth();
  const userId = user?.id;

  const chats = React.useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((chat: any) => transformChat(chat, userId));
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
  };
};

export default useContactUser;