import Button from "@/components/Button";
import TextField from "@/components/TextField";
import inputStyles from "@/components/TextField/TextField.module.scss";
import useAuth from "@/features/auth/utils/useAuth";
import { Formik } from "formik";
import React from "react";
import { MdClose } from "react-icons/md";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useGetChatMessages, useSendMessage } from "./chat.api";

type IProps = { openedChat: any; openedChatId: number; closeChat: Function };

const formatFromBackend = (value: any) => value.split("T")[0];
const formateDateObject = (value: any) =>
  value.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const OpenedChatBox = ({ openedChat, openedChatId, closeChat }: IProps) => {
  const { user } = useAuth();
  const [messageToSend, setMessageToSend] = React.useState("");
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const [newMessages, setNewMessages] = React.useState<any[]>([]);

  const {
    data,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetChatMessages(openedChatId);

  const messages = React.useMemo(() => {
    const oldMessages =
      data?.pages?.flatMap((pageData: any) => pageData.data.data)?.reverse() ??
      [];
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
    onSuccess: (data: any) => {
      setMessageToSend("");
      setNewMessages((prev) => [...prev, data.data]);
      scrollToBottom();
    },
  });
  const handleSendMessage = () => {
    if (!messageToSend || !openedChatId) return;
    sendMessage({ chat_id: openedChatId, message: messageToSend });
  };

  React.useEffect(() => {
    scrollToBottom();
    setMessageToSend("");
  }, [scrollToBottom, isSuccess]);

  return (
    <Formik onSubmit={console.log} initialValues={{ message: "" }}>
      <div
        style={{
          position: "fixed",
          width: "min(90%, 320px)",
          height: "min(90%, 500px)",
          bottom: "1rem",
          right: "1rem",
          backgroundColor: "#fff",
          zIndex: 5,
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            gap: "1rem",
            padding: ".75rem",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #eee",
            backgroundColor: "#eee",
          }}
        >
          <div>
            <h6>
              {openedChat.counter_user.first_name}{" "}
              {openedChat.counter_user.last_name}
            </h6>
            <p style={{ fontSize: ".75em" }}>
              {openedChat.counter_user.email}
              {" | "}
              {openedChat.counter_user.phone_number}
            </p>
          </div>
          <MdClose
            size={20}
            color="#000"
            style={{ cursor: "pointer" }}
            onClick={() => closeChat()}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flexGrow: 1,
          }}
        >
          {isError && (
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h6 style={{ textAlign: "center", color: "red" }}>
                An error occured
              </h6>
            </div>
          )}
          {isLoading && (
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <ScaleLoader />
            </div>
          )}
          {isSuccess && (
            <div
              style={{
                flexGrow: 1,
                overflow: "auto",
                padding: ".75rem",
                maxHeight: "265px",
              }}
              ref={messagesContainerRef}
            >
              {messages.length === 0 ? (
                <p style={{ textAlign: "center", paddingBlock: "5rem" }}>
                  No Messages
                </p>
              ) : (
                <>
                  {isFetchingNextPage ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: ".75rem",
                      }}
                    >
                      <ScaleLoader />
                    </div>
                  ) : (
                    <>
                      {hasNextPage && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: ".75rem",
                          }}
                        >
                          <Button
                            variant="outlined"
                            type="button"
                            onClick={fetchNextPage}
                            style={{ padding: ".5rem" }}
                          >
                            Load More
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  {messages.map((message) => {
                    const isSenderMe = message.user_id === user?.id;

                    return (
                      <div key={message.id}>
                        <p
                          style={{
                            marginTop: ".75rem",

                            backgroundColor: isSenderMe ? "#333" : "#eee",
                            marginInlineStart: isSenderMe ? "auto" : "0",
                            color: isSenderMe ? "#fff" : "#000",

                            borderRadius: "8px",
                            padding: ".5rem",
                            maxWidth: "80%",

                            fontSize: ".85em",
                          }}
                        >
                          {message.message}
                        </p>
                        <p
                          style={{
                            textAlign: isSenderMe ? "end" : "start",
                            fontSize: ".7em",
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
          <div
            style={{
              borderTop: "1px solid #eee",
              padding: ".75rem",
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            <TextField
              name="message"
              icon={null}
              disabled={isSendingMessage}
              value={messageToSend}
              // @ts-ignore
              onChange={(e) => setMessageToSend(e.target.value)}
              type="text"
              as="textarea"
              placeholder="Type your message..."
              className={inputStyles.input}
              style={{
                padding: ".75em",
              }}
            />

            <Button
              isDisabled={!messageToSend}
              isLoading={isSendingMessage}
              onClick={handleSendMessage}
              style={{ padding: ".5rem" }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default OpenedChatBox;
