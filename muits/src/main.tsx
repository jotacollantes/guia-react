import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CardMui } from "./muiComponents/Card";
import { NavBar } from "./muiComponents/navbar";
// import { Product } from './muiComponents';
// import { GridMui } from './muiComponents';
import { theme } from "./theme/muiTheme";
import { SnackbarProvider } from "notistack";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}
        autoHideDuration={3000}>
        <CssBaseline />
        <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
