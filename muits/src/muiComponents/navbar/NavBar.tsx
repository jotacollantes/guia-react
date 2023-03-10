import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { NavListDrawer } from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";




interface Props{
  links: {
    title:string,
    href:string,
    icon?:any
  }[]
}
export const NavBar = ({links}:Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <AppBar position="fixed">
        
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            sx={{display:{xs:"flex",sm:"none"}}}
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Con flexGrow:1 desplazo al resto de elementos hacia la derecha  */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Box sx={{display:{xs:"none",sm:"block"}}}>
            {
          links.map((item, ix) => {
            return (
              <Button
              color="inherit"
              component={NavLink}
              to={item.href}
              key={ix}
              >
              {item.title}
              </Button>
            );
          })
          }
          </Box>
          
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => {
          setOpen(false);
        }}
        // sx={{display:{xs:"flex",sm:"none"}}}
      >
        {/* Enviamos como props el arreglo de links y la referencia al metodo que actualiza el estado setOpen() */}
        <NavListDrawer links={links} setOpen={setOpen } />
      </Drawer>
    </Container>
  );
};
