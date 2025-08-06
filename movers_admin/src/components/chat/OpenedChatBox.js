import { useGetChatMessages, useSendMessage } from "api/chat";
import { LoadingButton } from "components/input";
import { formateDateObject, formatFromBackend } from "helpers/date";
import React from "react";
import { MdClose } from "react-icons/md";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";
import { useAuth } from "store/auth/useAuth";
import { useChatContext } from "utility/context/ChatContext";

const OpenedChatBox = () => {
  const { user } = useAuth();
  const { openedChat, closeChat } = useChatContext();
  const [messageToSend, setMessageToSend] = React.useState("");
  const messagesContainerRef = React.useRef(null);
  const [newMessages, setNewMessages] = React.useState([]);

  const {
    data,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetChatMessages(openedChat?.id);

  const messages = React.useMemo(() => {
    const oldMessages =
      data?.pages?.flatMap((pageData) => pageData.data.data)?.reverse() ?? [];
    return [...oldMessages, ...newMessages];
  }, [data, newMessages]);

  const scrollToBottom = React.useCallback(() => {
    messagesContainerRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, []);

  const { mutate: sendMessage, isLoading: isSendingMessage } = useSendMessage({
    onSuccess: (data) => {
      setMessageToSend("");
      setNewMessages((prev) => [...prev, data.data]);
      scrollToBottom();
    },
  });
  const handleSendMessage = () => {
    if (!messageToSend || !openedChat) return;
    sendMessage({ chat_id: openedChat.id, message: messageToSend });
  };

  React.useEffect(() => {
    scrollToBottom();
    setMessageToSend("");
  }, [scrollToBottom, isSuccess]);

  return (
    <Card
      style={{
        position: "fixed",
        width: "min(100%, 320px)",
        height: "min(90%, 500px)",
        bottom: "0",
        right: "2rem",
        backgroundColor: "#fff",
        zIndex: 5,
      }}
    >
      <CardFooter
        className="p-1 d-flex justify-content-between"
        style={{ gap: "1rem" }}
      >
        <div>
          <h6 className="m-0">
            {openedChat.counter_user.first_name}{" "}
            {openedChat.counter_user.last_name}
          </h6>
          <p style={{ fontSize: ".9em" }} className="m-0">
            {openedChat.counter_user.email}
            {" | "}
            {openedChat.counter_user.phone_number}
          </p>
        </div>
        <MdClose size={20} className="cursor-pointer" onClick={closeChat} />
      </CardFooter>
      <CardBody
        className="p-0 d-flex"
        style={{ flexDirection: "column", width: "100%" }}
      >
        {isError && (
          <div
            style={{ flexGrow: 1 }}
            className="d-flex align-items-center justify-content-center"
          >
            <h6 style={{ textAlign: "center", color: "red" }}>
              An error occured
            </h6>
          </div>
        )}
        {isLoading && (
          <div
            style={{ flexGrow: 1 }}
            className="d-flex align-items-center justify-content-center"
          >
            <Spinner />
          </div>
        )}
        {isSuccess && (
          <div
            style={{ flexGrow: 1, overflow: "auto" }}
            className="p-1"
            ref={messagesContainerRef}
          >
            {messages.length === 0 ? (
              <p className="py-5" style={{ textAlign: "center" }}>
                No Messages
              </p>
            ) : (
              <>
                {isFetchingNextPage ? (
                  <div className="d-flex align-items-center justify-content-center pb-1">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {hasNextPage && (
                      <div className="d-flex align-items-center justify-content-center pb-1">
                        <Button
                          type="button"
                          onClick={fetchNextPage}
                          style={{ padding: ".5rem" }}
                          color="secondary"
                          outline
                        >
                          Load More
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {messages.map((message) => {
                  const isSenderMe = message.user_id === user.id;

                  return (
                    <div key={message.id}>
                      <p
                        className="mb-0 mt-1"
                        style={{
                          backgroundColor: isSenderMe ? "#333" : "#eee",
                          marginInlineStart: isSenderMe ? "auto" : "0",
                          color: isSenderMe ? "#fff" : "#000",

                          borderRadius: "8px",
                          padding: ".5rem",
                          maxWidth: "80%",
                        }}
                      >
                        {message.message}
                      </p>
                      <p
                        className="mb-0"
                        style={{
                          textAlign: isSenderMe ? "end" : "start",
                          fontSize: ".8em",
                        }}
                      >
                        {formatFromBackend(
                          formateDateObject(new Date(message.created_at))
                        )}
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
        <div className="p-1" style={{ borderTop: "1px solid #eee" }}>
          <FormGroup>
            <Input
              className={"form-control"}
              disabled={isSendingMessage}
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
              type="textarea"
              rows="2"
              placeholder="Type your message..."
            />
          </FormGroup>
          <LoadingButton
            className="w-100"
            color="secondary"
            isDisabled={!messageToSend}
            isLoading={isSendingMessage}
            onClick={handleSendMessage}
          >
            Send
          </LoadingButton>
        </div>
      </CardBody>
    </Card>
  );
};

export default OpenedChatBox;
