import { useSingleUserQuery } from "@/modules/graphql/queries";
import { CustomGraphqlError } from "@/modules/types/index.types";
import { extractErrorMessage } from "@/utils/error";
import { Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface AuthComponentProps {
  type: "signup" | "login";
  label: string;
  onSubmit: (credentials: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
  children: React.ReactNode;
  error: CustomGraphqlError | null;
  isPending: boolean;
}

export default function AuthComponent({
  label,
  onSubmit,
  type,
  children,
  error,
  isPending,
}: AuthComponentProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const actualErrorMessage = extractErrorMessage(error);

  // const errorMessages =
  //   error?.graphQLErrors[0].extensions.originalError.message;

  const { data: user, isFetched } = useSingleUserQuery();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, isFetched]);

  useEffect(() => {
    if (error) {
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [error]);

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
          autoComplete="off"
        />
      )}
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="off"
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="off"
      />

      <Stack spacing={1}>
        {actualErrorMessage &&
          (Array.isArray(actualErrorMessage) ? (
            actualErrorMessage.map((message, index) => (
              <p key={index} className="text-red-600 m-0 text-sm font-normal">
                • {message}
              </p>
            ))
          ) : (
            <p className="text-red-600 m-0 text-sm font-normal">
              • {actualErrorMessage}
            </p>
          ))}
      </Stack>

      <Button
        variant="contained"
        onClick={() => onSubmit({ email, password, name })}
        disabled={isPending}
      >
        {label}
      </Button>
      {children}
    </Stack>
  );
}
