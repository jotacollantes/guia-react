import { Box } from "@mui/material";
import { NavBar } from "../ui";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const BlockBusterLayout = ({ children }: Props) => {
  return (
    //* Box es como un div
    <Box sx={{ display: "flex" }}>
      {/* navbar drawerWidth*/}
      <NavBar />
      {/* style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px" }} */}

      {/* <Box component='main'
    sx={{flexGrow:1,p:3,paddingLeft:35}}
    > */}
      <Box
        component="main"
        sx={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px" }}
      >
        {children}
      </Box>
    </Box>
  );
};
