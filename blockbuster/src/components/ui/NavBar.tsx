import { ShoppingCartOutlined } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logoBlockBuster.png";
import { CartContext } from "../../context/cart";

export const NavBar = () => {
  const { numberOfItems } = useContext(CartContext);
  return (
    <AppBar>
      <Toolbar>
        <NavLink to="/">
          <Box component="img" sx={{ height: 54 }} alt="Logo" src={logo} />
        </NavLink>

        <Box flex={1} />
        {/* Siempre se va a evaluar pantallas pequeñas Movil First
            xs:'none' Solo en pantallas pequeñas no se muestra 
            sm:'block' Luego a partir de pantallas no tan pequellas en adelante si se muestra */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NavLink to="/">
            <Button>Movies</Button>
          </NavLink>
          <NavLink to="/">
            <Button>Series</Button>
          </NavLink>
          <NavLink to="/">
            <Button>Episodes</Button>
          </NavLink>
        </Box>
        {/* Para que tome todo el espacio restante entre BOX */}
        <Box flex={1} />

        <NavLink to="/cart">
          <IconButton>
            <Badge badgeContent={numberOfItems}>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};
