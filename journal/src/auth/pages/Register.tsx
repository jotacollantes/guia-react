import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup"; //* importo todo dentro de Yup
import { MyTextInput } from "../forms";
import {Link as RouterLink} from 'react-router-dom' 
import { AuthLayout } from '../layout/AuthLayout'
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { RootState } from '../../store';

export const Register = () => {
  const dispatch =useDispatch()

  //!obtenemos el status del store
  const {errorMessages,status}=useSelector((state: RootState)=>state.authReducer);
  //! isAuthenticating sera usado en la propiedad disabled de los botones. Esto se puede memorizar usando useMemo. Ver el video capitulo 277 
  const isCheckingAuthenticating=(status==="checking");
  return (
    <AuthLayout title="Register">

<Formik
        initialValues={{
          displayName:"",
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          //console.log(values)
          console.log("entro")

          const { displayName,email, password } = values;

          const credentialsUser = {
            displayName,
            email,
            password
          }
           dispatch(startCreatingUserWithEmailPassword(credentialsUser))

          //console.log(credentialsUser)
          //!con el dispatch de redux llamo al metodo checkingAuthentication que esta en el thunk
          
          //dispatch(checkingAuthentication(correo,password))
        }}
        validationSchema={Yup.object({
          displayName: Yup.string() //*tiene que ser string
          .min(5,'debe de tener 5 caracteres o mas')
          .max(20,'debe de tener 15 caracteres o menos')
          .required("Requerido"),
          email: Yup.string() //*tiene que ser string
            //.min(5,'debe de tener 5 caracteres o mas')
            //.max(100,'debe de tener 15 caracteres o menos')
            .email("Debe de ser un correo valido")
            .required("Requerido"),

          password: Yup.string() //*tiene que ser string
            .min(6,'debe de tener 4 caracteres o mas')
            .required("Requerido"),
        })}
      >
        {/* CHILDREN de un Higher Order Component como los es el compnent <Formik>*/}
        {
          //* El Componente <Formik/> que es el Higher Order Component expone el objeto formik (que se puede desestructurar {}) que esta como argumento en la funcion children que devuelve un JSX Element

          ({ handleReset }) => (
      
      <Form>
        <Grid container>
          <Grid item xs={12} sx={{mt:2}}>
          <MyTextInput 
            label="Nombre Completo"
            type="text"
            name="displayName"
            placeholder='John Dee'
            fullWidth
            />
          </Grid>


          <Grid item xs={12} sx={{mt:2}}>
            <MyTextInput 
            label="Correo"
            type="email"
            name="email"
            placeholder='correo@google.com'
            fullWidth
            />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
            <MyTextInput 
            label="Contraseña"
            type="password"
            name="password"
            placeholder='Contraseña'
            fullWidth
            />
            </Grid>
            <Grid container spacing={2} sx={{mb:2,mt:1}}>
              
            
            {errorMessages && <Grid item xs={12} >
               <Alert severity='error'>{errorMessages}</Alert>
                
              </Grid>}
            
              
              <Grid item xs={12} >
                <Button
                type="submit"
                variant='contained'
                fullWidth
                disabled={isCheckingAuthenticating}
                >Crear Cuenta</Button>
                
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
      </Form>
      )
    }
  </Formik>
    </AuthLayout>
  )
}
