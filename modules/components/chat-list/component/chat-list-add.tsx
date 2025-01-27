import { useCreateChatMutation } from "@/modules/graphql/mutations";
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
  const [isPrivate, setIsPrivate] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const {
    mutate: createChatMutate,
    isPending: createChatIsPending,
    error: createChatError,
  } = useCreateChatMutation();

  const handleCreateChat = () => {
    console.log("before");

    if (!name) {
      setError("Name is required");
      return;
    }

    console.log("after");

    createChatMutate(
      {
        chat: {
          isPrivate,
          name,
          userIds: [],
        },
      },
      {
        onSuccess() {
          handleClose();
        },
        onError() {
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setError("");
        setName("");
        setIsPrivate(false)
        handleClose();
      }}
    >
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
            Create Chat
          </Typography>

          <FormGroup>
            <FormControlLabel
              label="Private chat"
              control={
                <Switch
                  // defaultChecked
                  value={isPrivate}
                  onChange={(event) => {
                    const clicked = event.target.checked;
                    setIsPrivate(clicked);
                  }}
                />
              }
            />
          </FormGroup>

          <TextField
            label="Name"
            autoComplete="off"
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
            error={!!error}
            helperText={error}
          />

          {isPrivate && (
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase placeholder="Search Users" sx={{ ml: 1, flex: 1 }} />
              <IconButton sx={{ p: "10px" }}>
                <Search />
              </IconButton>
            </Paper>
          )}

          <Button
            onClick={handleCreateChat}
            disabled={createChatIsPending}
            variant="outlined"
            fullWidth
          >
            Create Chat
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
