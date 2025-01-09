import AuthComponent from "@/modules/components/auth/auth";
import { useCreateUser } from "@/modules/graphql/mutations";
import { Box } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function SignUp() {
  const { createUser, loading, error } = useCreateUser();

  return (
    <>
      <Head>
        <title>SignUp</title>
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
          type="signup"
          label="Sign up"
          onSubmit={async (credentials) => {
            const { email, password, name } = credentials;

            if (!name) {
              throw new Error("Name is required");
            }

            console.log({ credentials });

            createUser({
              variables: {
                user: {
                  email,
                  password,
                  name: name,
                },
              },
            });
          }}
        >
          <Link href="/login" style={{ alignSelf: "center" }}>
            Login
          </Link>
        </AuthComponent>
      </Box>
    </>
  );
}
