import { Stack, Typography } from "@mui/material";

export default function HomeComponent() {
  return (
    <Stack 
      sx={{ 
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        p: 2
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Select a chat or create a new one to get started
      </Typography>
    </Stack>
  );
}
