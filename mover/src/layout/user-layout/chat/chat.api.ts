import client from "@/api/client";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetAllChats = () => {
  return useQuery({
    queryKey: ["ALL_CHATS"],
    queryFn: async () => {
      const { data } = await client.get(`/api/chat/all`);
      return data.data;
    },
  });
};

export const useCreateChat = ({ onSuccess }: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ALL_CHATS"],
    mutationFn: async ({ user_id }: { user_id: number }) => {
      const response = await client.post(`/api/chat/create`, { user_id });
      return response.data;
    },
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: ["ALL_CHATS"],
      });
    },
  });
};

export const useSendMessage = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (values: { chat_id: number; message: string }) => {
      const response = await client.post(`/api/chat/message`, values);
      return response.data;
    },
    onSuccess,
  });
};

export const useGetChatMessages = (chat_id: number) => {
  return useInfiniteQuery({
    queryKey: ["CHAT_MESSAGES", chat_id],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await client.post(`/api/chat/messages`, {
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
