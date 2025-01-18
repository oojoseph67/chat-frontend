import { AddCircle } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";

export default function ChatListHeader({ onClick }: { onClick: () => void }) {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={onClick}>
          <AddCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
