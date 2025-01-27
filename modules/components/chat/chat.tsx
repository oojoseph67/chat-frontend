import { useGetChatById } from "@/modules/graphql/queries";
import { Send as SendIcon } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Paper, Stack, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { chatId } = router.query;

  const { data: chatById } = useGetChatById({ chatId: chatId as string });

  return (
    <Stack sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ 
        flexGrow: 0,
        p: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}>
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
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: "10px" }}>
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Stack>
  );
}
