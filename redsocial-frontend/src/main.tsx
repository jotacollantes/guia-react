import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { RedSocialLayout } from "./components/layout/RedSocialLayout";

import { lightTheme } from "./themes";
import "./styles/global.css";
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />

        <RedSocialLayout>
          {/* <Home/> */}
          <App />
        </RedSocialLayout>
      </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
