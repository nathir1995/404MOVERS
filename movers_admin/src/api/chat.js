import {
  useAddMutation,
  useAxios,
  useGetQuery,
  useUpdateMutation,
} from "api/helpers";
import { useInfiniteQuery } from "react-query";

const API = {
  GET_ALL_CHATS: `/api/chat/all`,
  GET_CHAT_MESSAGES: `/api/chat/messages`,
  SEND_MESSAGE: `/api/chat/message`,
  CREATE_CHAT: `/api/chat/create`,
};

export const KEY = "CHAT";

export const useGetAllChats = () => useGetQuery(KEY, API.GET_ALL_CHATS);
export const useCreateChat = ({ onSuccess } = {}) =>
  useAddMutation(KEY, API.CREATE_CHAT, { onSuccess });

export const useGetChatMessages = (chat_id) => {
  const axios = useAxios();

  return useInfiniteQuery({
    queryKey: [KEY, chat_id],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.post(API.GET_CHAT_MESSAGES, {
        chat_id,
        page: pageParam,
      });
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.data.last_page === lastPage.data.current_page
        ? false
        : lastPage.data.current_page + 1,
    enabled: !!chat_id,
  });
};

export const useSendMessage = ({ onSuccess } = {}) =>
  useUpdateMutation("", API.SEND_MESSAGE, { onSuccess });
