import { useCreateMessageMutation } from "@/modules/graphql/mutations";
import { useGetChatById } from "@/modules/graphql/queries";
import { Send as SendIcon } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Chat() {
  const router = useRouter();
  const { chatId } = router.query;

  const { data: chatById } = useGetChatById({ chatId: chatId as string });

  const [messageContent, setMessageContent] = useState("");

  const { mutate: createMessageMutate, isPending } = useCreateMessageMutation();

  const handleSendMessage = () => {
    if (!chatById || !messageContent) return;

    createMessageMutate(
      {
        message: {
          chatId: chatById._id,
          content: messageContent,
        },
      },
      {
        onSuccess(data, variables, context) {
          setMessageContent("");
        },
        onError() {
          setMessageContent("");
        },
      }
    );
  };

  return (
    <Stack sx={{ height: "100%", width: "100%" }}>
      <Head>
        <title>Chatter - {chatById?.name}</title>
      </Head>
      <Box
        sx={{
          flexGrow: 0,
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" component="h1">
          {chatById?.name}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto", px: 2 }}>
        {/* Chat messages will go here */}
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Message"
            value={messageContent}
            onChange={(event) => setMessageContent(event.target.value)}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            onClick={handleSendMessage}
            disabled={isPending || !messageContent}
            color="primary"
            sx={{ p: "10px" }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Stack>
  );
}
