import {
  ExitToAppOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
  ViewTimelineOutlined,
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
import { HomeOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

import avatar from "../../../assets/img/user.png";
import { useAuth } from "../../../hooks";

export const NavBarPrivate = () => {
  const {logoutUser,profile}=useAuth()
  return (
    // <Container>
    <AppBar position="fixed">
      <Toolbar>
        {/* <NavLink to="/">
          <Box component="img" sx={{ height: 54 }} alt="Logo" src={logo} />
        </NavLink> */}

        {/* <Box flex={1} /> */}
        {/* Siempre se va a evaluar pantallas pequeñas Movil First
            xs:'none' Solo en pantallas pequeñas no se muestra 
            sm:'block' Luego a partir de pantallas no tan pequellas en adelante si se muestra */}

        <Typography
          variant="h1"
          // sx={{ flexGrow: 1 }}
        >
          Red Social
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <IconButton>
            <HomeOutlined />
          </IconButton>
          <NavLink to={'/social/feed'} >
          <Button color="inherit" variant="text">
            <Typography variant="h3">Inicio</Typography>
          </Button>
          </NavLink>
          <IconButton>
            <ViewTimelineOutlined />
          </IconButton>
          <NavLink to={'/social/feed'} >
          <Button color="inherit" variant="text">
            <Typography variant="h3">Timeline</Typography>
          </Button>
          </NavLink>
          <IconButton>
            <PersonOutlineOutlined />
          </IconButton>
          <NavLink to={'/social/people'} >
          <Button color="inherit" variant="text">
            <Typography variant="h3">Gente</Typography>
          </Button>
          </NavLink>
          {/* <Button
            color="inherit"
            variant= 'text'
            >
              <Typography variant="h3">Mensajes</Typography>
              
            </Button> */}
        </Box>

        {/* Para que tome todo el espacio restante entre BOX */}

        <Box flex={1} />
        {/* <Box sx={{ display: { xs: "none", sm: "block" } }}> */}

        <Box
          component="img"
          sx={{ height: 54, display: { xs: "none", sm: "block" } }}
          alt="Logo"
          src={
            profile.image==='profile.png'
            ? avatar
            : `http://127.0.0.1:3900/api/user/avatar/${profile.image}`
          }
            
        />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button color="inherit" variant="text">
            <Typography variant="h3">{profile.nick} </Typography>
          </Button>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
          <NavLink to={'/social/settings'}>
          <Button color="inherit" variant="text">
            <Typography variant="h3">Ajustes</Typography>
          </Button>
          </NavLink>
          <IconButton>
            <ExitToAppOutlined />
          </IconButton>
         <NavLink to={'/login'} onClick={()=>logoutUser()}>
          <Button color="inherit" variant="text">
            <Typography variant="h3">
              Logout
              </Typography>
          </Button>
          </NavLink>

        </Box>
      </Toolbar>
    </AppBar>
    // </Container>
  );
};
