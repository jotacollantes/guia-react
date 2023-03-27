import { Box, Button, Container,Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { GridMui, Product } from "./muiComponents";
import { CardMui } from "./muiComponents";
import { NavBar } from "./muiComponents/navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { ItemsUrl } from "./interfaces/linksInterfaces";


const listNavUrl: ItemsUrl[] = [
  {
    title: "Home",
  href: "/",
  icon: <InboxIcon />
  },
  {
    title: "Login",
    href: "/login",
    icon: <DraftsIcon />,
  },
  {
    title: "Register",
    href: "/register",
    icon: <MenuIcon />,
  },
];

function App() {
  return (
    <>
      <NavBar links={listNavUrl} />
      <Container sx={{ mt: 10 }}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<GridMui />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
