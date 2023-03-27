import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { redSocialApi } from '../../api';
import { isEmail } from '../../helpers/validation';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuth } from '../../hooks/useAuth';
type FormData = {
  email: string;
  password: string;
};
export const Login = () => {
  const{loginUser}=useAuth()
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();



  


  const onLoginUser = async ({ email, password }: FormData) => {
    //!No muestro el <Chip/>
    setShowError(false);
    //console.log({ email, password })
      const isValidLogin =await loginUser(email,password)
      if (!isValidLogin){
        setShowError(true)

     setTimeout(() => {
      setShowError(false)
     }, 3000);
        return;
      }

    
  };
  

  return (
    <>
    
    {/* No validate es para que no use la validacion propia de html para el input type="email" */}
    <form onSubmit={handleSubmit((data) => onLoginUser(data))} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesion
              </Typography>

              {showError && (
                <Chip
                  label="Usuario o Contraseña invalida"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: "flex" }}
                />
              )}
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
                    value: 6,
                    message: "Contraseña debe de ser de 6 o mas caracteres",
                  },
                })}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                //className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            

            
          </Grid>
        </Box>
      </form>
    </>
  )
}
