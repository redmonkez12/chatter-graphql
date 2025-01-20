import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Routes } from "./Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import { Guard } from "./components/auth/Guard";
import { BrowserRouter, useNavigate } from "react-router";
import { setNavigate } from "./router/router";
import { useEffect } from "react";
import Header from "./components/header/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header/>
        <Container>
          <Guard>
            <Routes />
          </Guard>
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
