import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { redSocialApi } from '../../api';
import { isEmail } from '../../helpers/validation';
type FormData = {
    name: string;
    surename:string;
    nick:string;
    email: string;
    password: string;
  };

export const Register = () => {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const onCreateUser = async ({ name, email,surename,nick, password }: FormData) => {

    //console.log({ name,surename,nick, email, password })
    //setShowError(false);

      
      let message=''

      
      try {
        const { data } = await redSocialApi.post(
        `/user/register`,JSON.stringify({ name, email,surename,nick, password }),{
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if(data.ok){
        console.log('Usuario grabado exitosamente')
        //console.log({data})
        //*Aqui hay que crear una sesion del usuario
      }
      
      } catch (error:any) {
       
        console.log(error.response.data.message)
        message=error.response.data.message
        setShowError(true);
        setErrorMessage(message)
        setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
      }
      

     
      
  };

  return (
    <>
    
        

        <form onSubmit={handleSubmit((data) => onCreateUser(data))} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Creacion de Usuario
              </Typography>

              {showError && (
                <Chip
                  //label="Usuario ya existe"
                  label={errorMessage}
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: "flex" }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
            
              <TextField
                label="Nombre"
                variant="outlined"
                //variant="filled"
                fullWidth
                {...register("name", {
                  required: "Nombre es requerido",
                  minLength: {
                    value: 2,
                    message: "Nombre debe de ser de 2 o mas caracteres",
                  },
                })}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
            
              <TextField
                label="Apellido"
                variant="outlined"
                //variant="filled"
                fullWidth
                {...register("surename", {
                  required: "Apellido es requerido",
                  minLength: {
                    value: 2,
                    message: "Apellido debe de ser de 2 o mas caracteres",
                  },
                })}
                error={errors.surename ? true : false}
                helperText={errors.surename?.message}
              />
            </Grid>
            <Grid item xs={12}>
            
              <TextField
                label="Nick"
                variant="outlined"
                //variant="filled"
                fullWidth
                {...register("nick", {
                  required: "Nick es requerido",
                  minLength: {
                    value: 2,
                    message: "Nick debe de ser de 2 o mas caracteres",
                  },
                })}
                error={errors.nick ? true : false}
                helperText={errors.nick?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Correo es requerido",
                  //!Aqui React hook form con su propiedad validate, le transmite el argumento email
                  validate: (email) => isEmail(email),
                })}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Contraseña"
                variant="outlined"
                fullWidth
                {...register("password", {
                  required: "Contraseña es requerida",
                  minLength: {
                    value: 8,
                    message: "Contraseña debe de ser de 8 o mas caracteres",
                  },
                })}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
            </Grid>
            {/*
            <Grid item xs={12}>
              <TextField
                label="Confirmar Contraseña"
                variant="outlined"
                fullWidth
              />
            </Grid>
            */}
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                
                size="large"
                fullWidth
              >
                Crear Usuario
              </Button>
            </Grid>

            
          </Grid>
        </Box>
      </form>
        
      
      
    </>
   
      
  )
}
