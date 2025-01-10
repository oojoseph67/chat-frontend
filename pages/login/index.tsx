import AuthComponent from "@/modules/components/auth/auth";
import { useLoginMutation } from "@/modules/graphql/mutations";
import { Box } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Login() {
  const { login, error } = useLoginMutation();

  console.log({ login, error });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AuthComponent
          type="login"
          label="Login"
          onSubmit={async (credentials) => {
            const { email, password } = credentials;

            login({ email, password });
          }}
        >
          <Link href="/signup" style={{ alignSelf: "center" }}>
            Sign Up
          </Link>
        </AuthComponent>
      </Box>
    </>
  );
}
