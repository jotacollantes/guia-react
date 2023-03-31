import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material';
import { NavBarPrivate } from './NavBarPrivate';
import { Outlet, Navigate } from 'react-router-dom';
import SideBar from './SideBar';
import { SideBar2 } from './SideBar2';
import { useAuth } from '../../../hooks/useAuth';



export const PrivateLayout = () => {
  const {auth,loading}=useAuth()
  

   if(loading){
    
    
    return <h1>Cargando...</h1>
    
   }


   //* si el usuario no esta autenticado lo redirecciono al login
  if(!auth.isLogged){
    
    return <Navigate to={'/login'}/>
  }
  return (
    
   <>
   <NavBarPrivate /> 

     {/* <Box sx={{display:'flex',justifyContent:'center' }}>
      <Typography variant='h1' component={'h1'}>Layout Publico</Typography>
    </Box> */}
     
      {/* <Box
        component="header"
        sx={{ margin: "80px auto"}}
      >  */}
       <Grid container
       //spacing={12}
       border={0}
       sx={{ display: "flex", justifyContent: "space-between",marginTop:10 }}
       //marginTop={10}
       >
      
        <Grid item xs={12}
        sm={8} 
        > 
        
        {/* Oulet Renders the child route's element, if there is one. Se usa en rutas agrupadas*/}
        <Outlet/>
        </Grid>
        
        <Grid item xs={12}
        sm={4}
        >
        <SideBar2/>
       
        </Grid>
        
       </Grid>
       {/* </Box> */}
    

    
    
   </>)
   }
       