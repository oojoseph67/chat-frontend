import { QueryProvider } from "@/modules/provider/index.provider";
import "@/styles/globals.css";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#212121",
    },
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#FFC107",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <QueryProvider>
          <Component {...pageProps} />
        </QueryProvider>
      </Container>
    </ThemeProvider>
  );
}
