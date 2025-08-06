import { useCreateChat, useGetAllChats } from "api/chat";
import { LoadingButton } from "components/input";
import { useChatContext } from "utility/context/ChatContext";

const CreateChat = ({ user_id }) => {
  const { isSuccess } = useGetAllChats();

  const { openChat, chats } = useChatContext();
  const { mutate: createChat, isLoading } = useCreateChat({
    onSuccess: (data) => {
      const chatId = data?.data?.id;
      if (chatId) {
        openChat(chatId);
      }
    },
  });

  const handleContact = () => {
    if (!isSuccess) return;
    const chatExists = chats.find((chat) => chat.counter_user.id === user_id);
    if (chatExists) {
      openChat(chatExists.id);
    } else {
      createChat({ user_id });
    }
  };

  return (
    <LoadingButton
      type="button"
      onClick={handleContact}
      isLoading={isLoading}
      isDisabled={!isSuccess}
      color="warning"
    >
      Contact
    </LoadingButton>
  );
};

export default CreateChat;
