import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import Layout from "./components/Layout";

// https://coolors.co/palette/006466-065a60-0b525b-144552-1b3a4b-212f45-272640-312244-3e1f47-4d194d

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#643047",
      },
      secondary: {
        main: "#ced4da",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
