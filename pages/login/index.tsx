import AuthComponent from "@/modules/components/auth/auth";
import { Box } from "@mui/material";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

export default function Login() {
  return (
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
        <Link href="/signup" style={{ alignSelf: 'center'}}>
          <MuiLink>Sign Up</MuiLink>
        </Link>
      </AuthComponent>
    </Box>
  );
}
