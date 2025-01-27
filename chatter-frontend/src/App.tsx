import {
  Container,
  createTheme,
  CssBaseline,
  Grid2,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { Routes } from "./Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import { Guard } from "./components/auth/Guard";
import { BrowserRouter, useLocation, useNavigate } from "react-router";
import { setNavigate } from "./router/router";
import { useEffect } from "react";
import Header from "./components/header/Header";
import { Snackbar } from "./components/snack/Snackbar";
import { ChatList } from "./components/chat-list/ChatList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const showChatList =
    location.pathname === "/" || location.pathname.includes("chats");

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {showChatList ? (
            <Grid2 container style={{ flex: 1 }}>
              <Grid2 size={{ md: 3 }}>
                <ChatList />
              </Grid2>
              <Grid2 size={{ md: 9 }}>
                <Container>
                  <Routes />
                </Container>
              </Grid2>
            </Grid2>
          ) : (
            <Routes />
          )}
        </Guard>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const WrappedApp = () => (
  <BrowserRouter>
    <Stack sx={{ height: "100%" }}>
      <App />
    </Stack>
  </BrowserRouter>
);

export default WrappedApp;
