import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { NavBarPublic } from "./NavBarPublic";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { useAuth } from '../../../hooks/useAuth';

export const PublicLayout = () => {
  const {auth,loading}=useAuth()
  if(loading){
    return <h1>Cargando...</h1>
   }
  //*Si el usuario ya esta autenticado lo redireciono a /social/feed
  if(auth.isLogged){
    return <Navigate to={'/social/feed'}/>
  }
  
  return (
    <>
      <nav>
        <NavBarPublic />
      </nav>
      {/* <Box display={'flex'} justifyContent='center' alignItems={'center'} height='calc(100vh - 200px)'>
   </Box>
   */}
      <Box
        // component="header"
        sx={{ margin: "80px auto" }}
      ><main>
        {/*<*
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px" }}
      >*/}
        
          {/* Renders the child route's element, if there is one. Se usa en rutas agrupadas*/}
          
            
          
          <Outlet />
          
          
          
          </main>
        
      </Box>
      <footer>{/* TODO: Footer */}</footer>
    </>
  );
};
