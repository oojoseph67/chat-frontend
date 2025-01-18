import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

export interface ChatListItemProps {
  avatar?: string;
  name: string;
  header: string;
  snippet: string;
}

export default function ChatListItem({
  header,
  name,
  snippet,
  avatar = "/static/images/avatar/1.jpg",
}: ChatListItemProps) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={header}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{
                  color: "text.primary",
                  display: "inline-block",
                  maxWidth: "100%",
                }}
                className="text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {name}
              </Typography>
              <Typography
                component="p"
                variant="body2"
                className="text-ellipsis overflow-hidden whitespace-nowrap"
                sx={{ maxWidth: "100%" }}
              >
                {snippet}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
