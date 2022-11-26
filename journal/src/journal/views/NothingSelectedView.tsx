import { Calculate, StarOutline } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React from 'react'

export const NothingSelectedView = () => {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    //Style extended
    
    sx={{minHeight: 'calc(100vh - 100px)',backgroundColor:'primary.main',padding:4,
    borderRadius:3}}
    className="animate__animated animate__fadeIn animate_faster"
    >
        <Grid item xs={12}>
            <StarOutline />

        </Grid>
        <Grid item xs={12}>
            <Typography color='white' variant='h5'> Selecciona o crea una entrada </Typography>

        </Grid>
     </Grid>
  )
}
