import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { Formik, Form } from "formik";
import * as Yup from "yup"; //* importo todo dentro de Yup
import { MyTextInput } from "../forms";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
export const Login = () => {
 const dispatch=useDispatch()

  const onGoogleSignIn=()=>{
    console.log("Login con google")
    dispatch(startGoogleSignIn())
  }
//!obtenemos el status del store
  const {status}=useSelector((state: RootState)=>state.authReducer);


  //! isAuthenticating sera usado en la propiedad disabled de los botones. Esto se puede memorizar usando useMemo. Ver el video capitulo 277 
  const isAuthenticating=(status==="checking");
 
  return (
    <AuthLayout title="Login">
      <Formik
        initialValues={{
          correo: "",
          password: "",
        }}
        onSubmit={(values) => {
          //console.log(values)

          const { correo, password } = values;

          // const credentialsUser = {
          //   correo,
          //   password,
          // }

          //console.log(credentialsUser)
          //!con el dispatch de redux llamo al metodo checkingAuthentication que esta en el thunk
          
          dispatch(checkingAuthentication(correo,password))
        }}
        validationSchema={Yup.object({
          correo: Yup.string() //*tiene que ser string
            //.min(5,'debe de tener 5 caracteres o mas')
            //.max(100,'debe de tener 15 caracteres o menos')
            .required("Requerido"),

          password: Yup.string() //*tiene que ser string
            .required("Requerido"),
        })}
      >
        {/* CHILDREN de un Higher Order Component como los es el compnent <Formik>*/}
        {
          //* El Componente <Formik/> que es el Higher Order Component expone el objeto formik (que se puede desestructurar {}) que esta como argumento en la funcion children que devuelve un JSX Element

          ({ handleReset }) => (
            <Form>
              <Grid container>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <MyTextInput
                    label="Correo"
                    type="email"
                    name="correo"
                    placeholder="correo@google.com"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <MyTextInput
                    label="Contraseña"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    fullWidth
                  />
                </Grid>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isAuthenticating}
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                    variant="contained"
                    fullWidth
                    onClick={onGoogleSignIn}
                    disabled={isAuthenticating}
                    >
                      {/* Icono de google */}
                      <Google />
                      <Typography sx={{ ml: 1 }}>Google</Typography>
                    </Button>
                  </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end">
                  {/* Primero el Link de material para el estilo
                RouterLink le da la funcionalidad
                */}
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to="/auth/register"
                  >
                    Crear una cuenta
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )
        }
      </Formik>
    </AuthLayout>
  );
};
