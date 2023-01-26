
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Typography,Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { BlockBusterLayout } from "../components/layouts";


export const EmptyCart = () => {
  return (
    <BlockBusterLayout>
        <Box
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        height={"calc(100vh - 200px)"}
        //Para que se ajuste a dispositivos moviles o a pantallas mas grandes.
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display={'flex'} flexDirection='column' alignItems={'center'}>
          <Typography>Su Carrito esta vacio</Typography>
          <NavLink to={'/'} >

          <Typography sx={{mb:5}} variant='h2' fontWeight={200} fontSize={20}>Regresar</Typography>
          </NavLink>
        </Box>
      </Box>
    </BlockBusterLayout>
      
    
  );
};