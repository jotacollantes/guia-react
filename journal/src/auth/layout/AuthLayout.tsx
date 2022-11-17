import { Grid, Typography } from '@mui/material'
import React from 'react'
interface Props{
    children: JSX.Element | JSX.Element[]; 
    title: string
}


// AuthLayout va a estar definido como un Higher order componenet
export const AuthLayout = ({children,title=''}:Props) => {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    //Style extended
    sx={{minHeight:'100vh',backgroundColor:'primary.main',padding:4}}
    >
     <Grid
     item
     className='box-shadow'
     //Tamaño
     xs={3}
     //Style extended
     sx={{
        width:{sm:450},
        backgroundColor:'white',padding:3,borderRadius:2}}
     >
       <Typography variant='h5' sx={{mb:1}}>{title}</Typography>
       {/* Children */}
       {children}

 </Grid >
 </Grid >

  )
}
