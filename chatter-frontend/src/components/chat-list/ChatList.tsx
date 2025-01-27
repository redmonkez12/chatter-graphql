import List from "@mui/material/List";
import { ChatListItem } from "./chat-list-item/ChatListItem";
import { Divider, Stack } from "@mui/material";
import { ChatListHeader } from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import { ChatListAdd } from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { useLocation } from "react-router";

export const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data } = useGetChats();
  const location = useLocation();

  useEffect(() => {
    const pathSplit = location.pathname.split("chat/");
    if (pathSplit.length === 2) {
      const chatId = pathSplit[1];
      setSelectedChatId(chatId);
    }
  }, [location.pathname]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats
            .map((chat) => (
              <ChatListItem
                chat={chat}
                selected={chat._id === selectedChatId}
              />
            ))
            .reverse()}
        </List>
      </Stack>
    </>
  );
};
