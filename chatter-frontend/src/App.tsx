import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes } from "./Routes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <Routes/>
        </Container>
    </ThemeProvider>
  );
}

export default App;
