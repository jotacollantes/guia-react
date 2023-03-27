import React from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material';
import avatar from "../../../assets/img/user.png";
import { useAuth } from '../../../hooks';

export const SideBar2 = () => {
    const {profile,counter}=useAuth()
  return (
    <>
    <Grid container
    sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start",marginBottom:2 }}
    >
        <Grid item sx={{marginLeft:2}}>
        <Typography variant="h1" component="h1">
                Hola, {profile.name}
              </Typography>
        </Grid>

    </Grid>

    <Divider variant="middle" />
    <Grid container
    sx={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:3 }}
    >
        <Grid item>
            <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Grid item>
            <Box component="img"
            sx={{ height: 60,border:0,paddingRight:2}}
            alt="Logo" src={
                profile.image==='default.png'
                ?avatar
                :`http://127.0.0.1:3900/api/user/avatar/${profile.image}`
            }
            />

            </Grid>
            <Grid item>
                <Typography
                variant="h1"
                component="h1">{`${profile.name } ${profile.surname }`}</Typography>
                <Typography
                variant="h2"
                component="h2"
                >{profile.nick}</Typography>

            </Grid>

            </Grid>


        </Grid>
        <Grid item>
        <Grid container
        spacing={3}
        sx={{alignItems: "center", justifyContent: "center"}}
        >
        <Grid item >
            <Typography
            variant={'subtitle1'}>
                Siguiendo
                </Typography>
            <Typography variant={'h3'} textAlign={'center'}>{counter.following}</Typography>
        </Grid>
        <Grid item>
            <Typography variant={'subtitle1'}>Seguidores</Typography>
            <Typography variant={'h3'}textAlign={'center'}>{counter.followed}</Typography>
        </Grid>
        <Grid item>
            <Typography variant={'subtitle1'}>Publicaciones</Typography>
            <Typography variant={'h3'} textAlign={'center'}>{counter.publication}</Typography>
            </Grid>

        </Grid>

        </Grid>

    </Grid>
    </>

    
  )
}
