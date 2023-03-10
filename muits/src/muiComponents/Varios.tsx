import { Box, Button, Container, Typography } from '@mui/material'
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AndroidIcon from "@mui/icons-material/Android";

export const Varios = () => {
  return (
    <Container sx={{border:2,boxShadow:2,paddingBottom:2}}>
    {/* Variant configura el stilo pero component le especifica con que tag de html aparecera en la fuente */}
    <Typography variant="h6" component="h1">
      titulo 1
    </Typography>
    <Typography variant="h6" component="span">
      titulo 2
    </Typography>
    <Typography variant="h6" component="h2" textAlign={'center'}>
      titulo 3
    </Typography>
    <Button variant="contained" color="primary" startIcon={<AirplanemodeActiveIcon />}>
      Mi primer boton
    </Button>
    <Button variant="outlined" color="primary"
    endIcon={<AndroidIcon />}>
      Mi segundo boton
    </Button>
    <Box sx={{border:2,padding:5,marginTop:5}}>
      Esto es un box de material
    </Box>
    </Container>
  )
}
