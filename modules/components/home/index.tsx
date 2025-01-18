import { Grid2, Grid, Container } from "@mui/material";
import ChatList from "../chat-list/chatList";

export default function HomeComponent() {
  return (
    <Grid2 container>
      <Grid item md={3}>
        <ChatList />
      </Grid>
      <Grid item md={9}>
        <Container>Home</Container>
      </Grid>
    </Grid2>
  );
}
