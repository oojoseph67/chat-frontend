import { Grid, Container } from "@mui/material";
import ChatList from "../chat-list/chatList";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item md={3} sx={{ height: "100%" }}>
        <ChatList />
      </Grid>
      <Grid item md={9} sx={{ height: "100%", overflow: "hidden" }}>
        {children}
      </Grid>
    </Grid>
  );
} 