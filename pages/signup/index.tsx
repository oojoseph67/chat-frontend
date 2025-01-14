import AuthComponent from "@/modules/components/auth/auth";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "@/modules/graphql/mutations";
import { Box } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function SignUp() {
  const {
    mutate: signUpMutateMutation,
    error,
    isPending,
  } = useCreateUserMutation();

  const {
    mutate: loginMutateMutation,
    error: loginError,
    isPending: isPendingLogin,
  } = useLoginMutation();

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
          error={error || loginError}
          isPending={isPending || isPendingLogin}
          onSubmit={async (credentials) => {
            const { email, password, name } = credentials;

            if (!name) {
              throw new Error("Name is required");
            }

            signUpMutateMutation(
              {
                user: {
                  email,
                  password,
                  name,
                },
              },
              {
                onSuccess(data, variables, context) {
                  loginMutateMutation({
                    request: {
                      email,
                      password,
                    },
                  });
                },
              }
            );
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
