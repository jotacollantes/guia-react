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
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import avatar from "../../assets/img/user.png";

export const Profile = () => {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
        }}
        border={0}
      >


        <Grid item xs={12} sx={{ marginLeft: 2 }}>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              border: 0,
            }}
          >
            <Grid item>
              <Box
                component="img"
                sx={{ height: 60, border: 0, paddingRight: 2 }}
                alt="Logo"
                src={avatar}
              />
            </Grid>
            <Grid item>
              <Typography variant="h2" component="h2" sx={{ fontWeight: 900 }}>
                Nombre y apellido
              </Typography>

              <Grid container spacing={1} sx={{display:"flex",alignItems:"center"}}>
                <Grid item>
                  <Typography variant="h2" component="h2">
                    nick
                  </Typography>
                  <Typography variant="h2" component="h2">
                    bio
                  </Typography>
                </Grid>
                <Grid item>
                <Button
               color='success'
               size="large"
               variant="contained"
               >Seguir</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>




        <Grid item xs={12} sx={{ marginLeft: 2 }}>
        <Grid container
        spacing={3}
        sx={{alignItems: "center", justifyContent: "start"}}
        >
        <Grid item >
            {/* <Link to={`siguiendo/${auth.id}`}> */}
            <Typography
            variant={'subtitle1'}>
                Siguiendo
                </Typography>
            <Typography variant={'h3'} textAlign={'center'}>10</Typography>
            {/* </Link> */}
            
        </Grid>
        <Grid item>
        {/* <Link to={`seguidores/${auth.id}`}> */}
            <Typography variant={'subtitle1'}>Seguidores</Typography>
            <Typography variant={'h3'}textAlign={'center'}>10</Typography>
        {/* </Link> */}
        </Grid>
        <Grid item>
          {/* <Link to={`/social/perfil/${profile.id}`}> */}
          <Typography variant={'subtitle1'}>Publicaciones</Typography>
            <Typography variant={'h3'} textAlign={'center'}>10</Typography>
          {/* </Link> */}
            
        </Grid>
        </Grid>
        </Grid>






      </Grid>

      <Divider variant="middle" />

      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 3,
        }}
        border={0}
      >
        <Grid item xs={3} border={0}>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
            border={0}
          >
            <Grid item>
              <Box
                component="img"
                sx={{ height: 60, border: 0, paddingRight: 2 }}
                alt="Logo"
                src={avatar}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} border={0}>
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
        <Grid item xs={3} border={0}>
          {/* <Box> */}

          <IconButton>
            <DeleteIcon color="error" sx={{ fontSize: 40 }} />
          </IconButton>

          {/* </Box> */}
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        <Grid item>
          <Button color="primary" size="large" variant="contained">
            Ver Mas publicaciones
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
