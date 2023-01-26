import {
  SearchOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
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
  const {numberOfItems} = useContext(CartContext)
  return (
    <AppBar>
      <Toolbar>
        <NavLink to="/">
          {/* <Link display={'flex'} alignItems='center'> */}
          <Box component="img" sx={{ height: 54 }} alt="Logo" src={logo} />
          {/* </Link> */}
        </NavLink>
        {/* Todo Flex */}
        {/* Para que tome todo el espacio restante entre BOX */}
        <Box flex={1} />
        {/* Siempre se va a evaluar pantallas pequeñas Movil First
            xs:'none' Solo en pantallas pequeñas no se muestra 
            sm:'block' Luego a partir de pantallas no tan pequellas en adelante si se muestra */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NavLink to="/">
            {/* <Link> */}
            <Button>Movies</Button>
            {/* </Link> */}
          </NavLink>
          <NavLink to="/category/series">
            {/* <Link> */}
            <Button>Series</Button>
            {/* </Link> */}
          </NavLink>
          <NavLink to="/category/episodes">
            {/* <Link> */}
            <Button>Episodes</Button>
            {/* </Link> */}
          </NavLink>
        </Box>
        {/* Para que tome todo el espacio restante entre BOX */}
        <Box flex={1} />
        {/* Todo Flex */}

        {/* <IconButton>
          <SearchOutlined />
        </IconButton> */}

        <NavLink to="/cart">
          {/* <Link> */}
          <IconButton>
            <Badge badgeContent={numberOfItems}>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
          {/* </Link> */}
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};
