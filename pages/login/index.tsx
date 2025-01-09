import AuthComponent from "@/modules/components/auth/auth";
import { Box } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Login() {
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
            const { email, password, name } = credentials;
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
