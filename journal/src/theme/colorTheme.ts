import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const colorTheme=createTheme({
    palette: {
        primary: {
          //main: "#262254"
          main: '#6B728E',
        },
        secondary: {
          //main: '#543884',
          main: '#19857b',
        },
        error: {
          main: red.A400,
        },
      },
})