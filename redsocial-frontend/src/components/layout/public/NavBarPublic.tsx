import {
  ExitToAppOutlined,
  GroupAddOutlined,
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

export const NavBarPublic = () => {
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

        <Typography variant="h1" sx={{ flexGrow: 1 }}>
          Red Social
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          
        <NavLink to="/login">
          <IconButton>
              <PersonOutlineOutlined />
            </IconButton>
            <Button color="inherit" variant="text">
              <Typography variant="h3">Login</Typography>
            </Button>
        </NavLink>
            

            <IconButton>
              <GroupAddOutlined />
            </IconButton>
            <Button
            color="inherit"
            variant="text"
            component={NavLink}
            to={'/registro'}

            >
              <Typography variant="h3">Registro</Typography>
            </Button>
          
        </Box>
      </Toolbar>
    </AppBar>
    // </Container>
  );
};
