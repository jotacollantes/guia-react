import { DeleteOutline, SettingsOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import avatar from "../../assets/img/user.png";

export const Feed = () => {
  return (
  <>
  
  <Grid
      container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center",marginBottom:2 }}
      border={0}
    >
     
      <Grid item xs={12} sx={{marginLeft:2}}>
        {/* <Box border={0} sx={{marginBottom:2}}> */}
          <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
          >
            <Grid item>
              <Typography variant="h1" component="h1">
                Timeline
              </Typography>
             </Grid>
            <Grid item alignItems={'center'}>
               <Button
               color='primary'
               size="large"
               variant="contained"
               >Mostrar Nuevas</Button>
            </Grid>
           </Grid>
        {/* </Box> */}
      </Grid>
     
    </Grid>

    <Divider variant="middle" />



  
  
  <Grid
      container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:3 }}
      border={0}
    >
      
      
      
      
      <Grid item xs={3}
      border={0} 
      
      >

      <Grid
      container
      sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      border={0}>
      <Grid item> 
      <Box component="img"
        sx={{ height: 60,border:0,paddingRight:2}}
        alt="Logo" src={avatar}
        />
      </Grid>

      </Grid>


        
      </Grid>
      <Grid item xs={6}
      border={0}
      >
        {/* <Box> */}
          <Card variant="outlined">
            <CardActions>
              <Typography variant="h6" component="div">
                Jota Collantes | Hace una hora
              </Typography>
            </CardActions>
            <CardContent>
              <Typography variant="h5" component="div">
                Hola, buenos dias
              </Typography>
            </CardContent>
          </Card>
        {/* </Box> */}
      </Grid>
      <Grid item xs={3}
      border={0}
      >
        {/* <Box> */}
          
            <IconButton>
              <DeleteIcon color="error" sx={{ fontSize: 40 }} />
            </IconButton>
         
        {/* </Box> */}
      </Grid>
    </Grid>

    {/* Otra Publiucacion */}
    <Grid
      container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:3 }}
      border={0}
    >
      <Grid item xs={3}
      border={0} 
      
      >

      <Grid
      container
      sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      border={0}>
      <Grid item> 
      <Box component="img"
        sx={{ height: 60,border:0,paddingRight:2}}
        alt="Logo" src={avatar}
        />
      </Grid>

      </Grid>


        
      </Grid>
      <Grid item xs={6}
      border={0}
      >
        {/* <Box> */}
          <Card variant="outlined">
            <CardActions>
              <Typography variant="h6" component="div">
                Jota Collantes | Hace una hora
              </Typography>
            </CardActions>
            <CardContent>
              <Typography variant="h5" component="div">
                Hola, buenos dias
              </Typography>
            </CardContent>
          </Card>
        {/* </Box> */}
      </Grid>
      <Grid item xs={3}
      border={0}
      >
        {/* <Box> */}
          
            <IconButton>
              <DeleteIcon color="error" sx={{ fontSize: 40 }} />
            </IconButton>
         
        {/* </Box> */}
      </Grid>
    </Grid>

    {/* FIn de PUblicacion */}

    <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:3 }}>
      <Grid item>
      <Button
               color='primary'
               size="large"
               variant="contained"
               >Ver Mas publicaciones</Button>
      </Grid>

    </Grid>
  </>







    
  );
};
