import List from "@mui/material/List";
import ChatListItem from "./component/chat-list-item";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./component/chat-list-header";
import { useState } from "react";
import ChatListAdd from "./component/chat-list-add";

const dummyList = [
  {
    header: "Project Update",
    name: "Sarah Johnson",
    snippet: "Hey team, Ive pushed the latest changes to...",
  },
  {
    header: "Meeting Notes",
    name: "David Chen",
    snippet: "Heres a summary of todays client meeting...",
  },
  {
    header: "Bug Fix #123",
    name: "Emma Williams",
    snippet: "I found the issue with the login component...",
  },
  {
    header: "Weekend Plans",
    name: "Michael Brown",
    snippet: "Anyone up for a team lunch this Saturday?",
  },
  {
    header: "New Feature Request",
    name: "Lisa Anderson",
    snippet: "The client would like to add a new dashboard...",
  },
];

export default function ChatList() {
  const [addChatListModal, setAddChatListModal] = useState(false);

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
          {dummyList.map((list, index) => {
            return (
              <ChatListItem
                key={index}
                header={list.header}
                name={list.name}
                snippet={list.snippet}
              />
            );
          })}
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
