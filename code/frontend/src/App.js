import React from "react"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import useMediaQuery from "@mui/material/useMediaQuery"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"

import AppNav from "AppNav"
import QueryPage from "QueryPage"

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  )
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/">
              <AppNav>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <img src="logo.png" height="100px" alt="logo" />
                </Box>
                <Switch>
                  <Route exact path="/query">
                    <QueryPage />
                  </Route>
                  <Route exact path="/upload"></Route>
                  <Route exact path="/status"></Route>
                  <Route>
                    <Redirect to="/query" />
                  </Route>
                </Switch>
              </AppNav>
            </Route>
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
