import { SearchInput } from "components/input";
import React from "react";
import { useChatContext } from "utility/context/ChatContext";

const ChatSideDrawerContent = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const { chats, openChat } = useChatContext();

  const filteredChats = React.useMemo(() => {
    if (!searchValue) return chats;

    const searchTerm = searchValue.toLocaleLowerCase();
    return chats.filter(
      (chat) =>
        `${chat.counter_user.first_name} ${chat.counter_user.last_name}`
          .toLocaleLowerCase()
          .includes(searchTerm) ||
        chat.counter_user.email?.includes(searchTerm) ||
        chat.counter_user.phone_number?.includes(searchTerm)
    );
  }, [chats, searchValue]);

  return (
    <div>
      <div className="d-flex justify-content-between p-1">
        <h5>Chats</h5>
        <h5>{chats.length}</h5>
      </div>
      <div className="mb-2 px-1">
        <SearchInput
          onChange={setSearchValue}
          placeholder={"Search for a user"}
          style={{ maxWidth: "100%" }}
          disabled={chats.length === 0}
        />
      </div>

      {filteredChats.length === 0 ? (
        <h6 style={{ textAlign: "center" }}>No Chats Available</h6>
      ) : (
        <>
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="cursor-pointer highlight-on-hover p-1"
              style={{ borderBottom: "1px solid #eee" }}
              onClick={() => openChat(chat.id)}
            >
              <h5>
                {chat.counter_user.first_name} {chat.counter_user.last_name}
              </h5>
              <p className="m-0">{chat.counter_user.email}</p>
              <p className="m-0">{chat.counter_user.phone_number}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ChatSideDrawerContent;
