import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { lightTheme } from "./themes";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./context/movie";
import { CartProvider } from "./context/cart";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <MovieProvider>
        <BrowserRouter>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </MovieProvider>
    </CartProvider>
  </React.StrictMode>
);
