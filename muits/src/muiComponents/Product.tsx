import styled from '@emotion/styled'
import { Box, Button, Container, Hidden, Paper, Typography } from '@mui/material';
import React, { Component } from 'react'

export const Product = () => {

    //*Creamos un Styled component
    const Img=styled("img")({
        width:200,
        height:"100%",
        objectFit:"cover",
        objectPosition:"center"
    })
  return (
    <Container sx={{ mt: 5 }}>
    <Paper sx={{
        display:"flex",
        alignItems:"center",
        gap:2,
        overflow:"hidden",
        m:5
    }}>
        <Img src='https://via.placeholder.com/200' alt='random'/>
        
        <Box sx={{flexGrow:1,display:"grid",gap:4 }}>
            <Typography variant='h6'>Product Name</Typography>
            <Typography variant='body1'>Product Description</Typography>
        <Button variant='contained'>Add cart</Button>
        </Box>
        <Box sx={{mr:2}}  component={"p"}>19,99</Box>
    </Paper>
    </Container>
  )
}
