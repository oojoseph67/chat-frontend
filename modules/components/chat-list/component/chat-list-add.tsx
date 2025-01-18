import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function ChatListAdd({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>

          <FormGroup>
            <FormControlLabel
              label="Private chat"
              control={
                <Switch
                  defaultChecked
                  value={isPrivate}
                  onChange={(event) => {
                    const clicked = event.target.checked;
                    setIsPrivate(clicked);
                  }}
                />
              }
            />
          </FormGroup>

          {isPrivate ? (
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase placeholder="Search Users" sx={{ ml: 1, flex: 1 }} />
              <IconButton sx={{ p: "10px" }}>
                <Search />
              </IconButton>
            </Paper>
          ) : (
            <TextField label="Name" />
          )}

          <Button variant="outlined" fullWidth>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
