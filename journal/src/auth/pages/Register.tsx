import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom' 
import { AuthLayout } from '../layout/AuthLayout'

export const Register = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{mt:2}}>
          <TextField 
            label="Nombre Completo"
            type="text"
            placeholder='John Dee'
            fullWidth
            />
          </Grid>


          <Grid item xs={12} sx={{mt:2}}>
            <TextField 
            label="Correo"
            type="email"
            placeholder='correo@google.com'
            fullWidth
            />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
            <TextField 
            label="Contraseña"
            type="password"
            placeholder='COntraseña'
            fullWidth
            />
            </Grid>
            <Grid container spacing={2} sx={{mb:2,mt:1}}>
              <Grid item xs={12} >
                <Button variant='contained' fullWidth>Crear Cuenta</Button>
                
              </Grid>
              
           
            </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
                {/* Primero el Link de material para el estilo
                RouterLink le da la funcionalidad
                */}
                <Link component={RouterLink} color='inherit' to='/auth/login'>
                Ingresar
                </Link>

              </Grid>
            
              

        </Grid>
      </form>
    </AuthLayout>
  )
}
