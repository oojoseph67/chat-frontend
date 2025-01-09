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
        type="signup"
        label="Sign up"
        onSubmit={async (credentials) => {}}
      >
        <Link href="/login" style={{ alignSelf: "center" }}>
          <MuiLink>Login</MuiLink>
        </Link>
      </AuthComponent>
    </Box>
  );
}
