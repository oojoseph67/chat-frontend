import List from "@mui/material/List";
import ChatListItem from "./component/chat-list-item";
import { Divider, Stack, Box, CircularProgress } from "@mui/material";
import ChatListHeader from "./component/chat-list-header";
import { useState } from "react";
import ChatListAdd from "./component/chat-list-add";
import { useGetAllChatsQuery } from "@/modules/graphql/queries";

export default function ChatList() {
  const [addChatListModal, setAddChatListModal] = useState(false);

  const { data: allChats, isLoading: allChatsIsLoading } =
    useGetAllChatsQuery();

  return (
    <>
      <Stack>
        <ChatListHeader
          onClick={() => {
            setAddChatListModal(true);
          }}
        />
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
          {allChatsIsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            allChats?.map((list, index) => (
              <ChatListItem
                key={index}
                header={list.name}
                name={list.name}
                snippet={"Send message"}
                chatId={list._id}
                // snippet={list.snippet}
              />
            ))
          )}
        </List>
      </Stack>

      {/**
       * MODAL
       */}

      <ChatListAdd
        open={addChatListModal}
        handleClose={() => {
          setAddChatListModal(false);
        }}
      />
    </>
  );
}
