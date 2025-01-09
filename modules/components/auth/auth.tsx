import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

interface AuthComponentProps {
  type: "signup" | "login";
  label: string;
  onSubmit: (credentials: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
  children: React.ReactNode;
}

export default function AuthComponent({
  label,
  onSubmit,
  type,
  children,
}: AuthComponentProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <Stack
      spacing={3}
      sx={{
        width: "100%",
        maxWidth: {
          xs: "70%",
          md: "30%",
        },
        margin: "0 auto",
        padding: 3,
      }}
    >
      {type === "signup" && (
        <TextField
          type="text"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      )}
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => onSubmit({ email, password, name })}
      >
        {label}
      </Button>
      {children}
    </Stack>
  );
}
