import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup"; //* importo todo dentro de Yup
import React from "react";
import { ImageGallery } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MyTextInput } from "../../auth/forms";

export const NoteView = () => {
  const { activeNote } = useSelector(
    (state: RootState) => state.journalReducer
  );
  const dateString = new Date(activeNote!.date).toUTCString();

  return (

      <Formik
        initialValues={{
          titulo: activeNote!.title,
          body: activeNote!.body,
          //titulo: '',
          //body: '',
        }}
        onSubmit={(values) => {
          
          console.log(values);
        }}
        validationSchema={Yup.object({
          titulo: Yup.string() //*tiene que ser string
            //.min(5,'debe de tener 5 caracteres o mas')
            //.max(100,'debe de tener 15 caracteres o menos')
            //.email("Debe de ser un correo valido")
            .required("Requerido"),

          body: Yup.string() //*tiene que ser string
            .required("Requerido"),
        })}
      >
        {/* CHILDREN de un Higher Order Component como los es el compnent <Formik>*/}
        {
          //* El Componente <Formik/> que es el Higher Order Component expone el objeto formik (que se puede desestructurar {}) que esta como argumento en la funcion children que devuelve un JSX Element

          ({ handleReset }) => (
            <Form className="animate__animated animate__fadeIn animate_faster">
              
              <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
              className="animate__animated animate__fadeIn animate_faster">
              
              
              
              
              <Grid item>
                <Typography fontSize={39} fontWeight="light">
                  {dateString}
                </Typography>
              </Grid>

              <Grid item>
                <Button color="primary" sx={{ padding: 2 }} type="submit">
                  <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                  Guardar
                </Button>
              </Grid>
              <Grid container>
                <MyTextInput
                  type="text"
                  variant="filled"
                  fullWidth
                  placeholder="Ingrese un Titulo"
                  label="Titulo"
                  name="titulo"
                  sx={{ border: "none", mb: 1 }}
                ></MyTextInput>
                <MyTextInput
                  type="text"
                  variant="filled"
                  fullWidth
                  multiline
                  placeholder="Que sucedio hoy?"
                  minRows={5}
                  name="body"
                  sx={{ border: "none", mb: 1 }}
                ></MyTextInput>
              </Grid>


             <ImageGallery />
              </Grid> 

            </Form>
          )
        }
      </Formik>
     
  );
};
