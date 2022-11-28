import { DeleteOutline, SaveOutlined, Title, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup"; //* importo todo dentro de Yup
import React, { useEffect, useRef, useState } from "react";
import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { MyTextInput } from "../../auth/forms";
import {
  Note,
  setSelectedNote,
  startDeletingNote,
  startSaveUpdatedNote,
  startUploadingFiles,
} from "../../store/journal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote, messageSaved, isSaving } = useSelector(
    (state: RootState) => state.journalReducer
  );

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota Actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const dateString = new Date(activeNote!.date).toUTCString();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //SI no hay archivos seleccionados se sale de la funcion
    if (!e.target.files) return;
     //console.log("Archivos seleccionados:",e.target.files)
     //console.log(typeof e.target.files)
    dispatch(startUploadingFiles(e.target.files))
   
  };
  //Para simular el click del input file pero haciendo el click en el boton vinculando ambos elementes con el fileInputRef
  const fileInputRef=useRef<HTMLInputElement>(null)
  const onDelete=()=>{
      dispatch(startDeletingNote())
  }
  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          titulo: activeNote!.title,
          body: activeNote!.body,
        }

        // {
        // titulo: activeNote!.title,
        // body: activeNote!.body
        // }
      }
      onSubmit={(values) => {
        //console.log(values);
        const activeNoteUpdatedObj: Note = {
          id: activeNote!.id,
          title: values.titulo,
          body: values.body,
          date: activeNote!.date,
          //imageUrls: []
          imageUrls:activeNote!.imageUrls
        };

        //!envio la nota actualizada al store
        dispatch(setSelectedNote(activeNoteUpdatedObj));
        //!Aqui hacemos la tarea de actulizar la base
        dispatch(startSaveUpdatedNote());
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
              className="animate__animated animate__fadeIn animate_faster"
            >
              <Grid item>
                <Typography fontSize={39} fontWeight="light">
                  {dateString}
                </Typography>
              </Grid>

              <Grid item>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    onFileInputChange(e);
                  }}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                <IconButton
                color="primary"
                disabled={isSaving}
                onClick={()=>{
                  fileInputRef.current!.click()
                } }
                >
                  <UploadOutlined />
                </IconButton>

                <Button
                  color="primary"
                  sx={{ padding: 2 }}
                  type="submit"
                  disabled={isSaving}
                >
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
                <Grid container justifyContent='end'>
                  <Button
                  onClick={onDelete}
                  sx={{mt:2}}
                  color="error"
                  >
                    <DeleteOutline />
                    Borrar
                  </Button>

                </Grid>
              <ImageGallery images={activeNote!.imageUrls}/>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
};
