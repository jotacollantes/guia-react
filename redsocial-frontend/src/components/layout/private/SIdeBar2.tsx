import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import avatar from "../../../assets/img/user.png";
import { useAuth } from "../../../hooks";
import { Link } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";
import { redSocialApi } from "../../../api";
import { usePublication } from "../../../hooks/usePublication";

type FormData = {
  text: string;
};
export const SideBar2 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isSaved, setIsSaved] = useState(false);

  const { profile, counter, auth, getCounters } = useAuth();
  const {pages,total,publicationsByUser, getPublication,deletePublication } = usePublication();

  const onSavePublication = async ({ text }: FormData) => {
    //setShowError(false);

    let message = "";
    let idPublication = "";

    try {
      const { data } = await redSocialApi.post(
        `publication/save`,
        JSON.stringify({ text: text }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      );
      console.log("respuesta", data);
      if (data.status === "success") {
        //Subida de imagenes
        idPublication = data.message._id;
        let imageNameUpload = "";
        //Mapeamos el input de la imagen
        const fileInput: any = document.querySelector("#file");
        if (fileInput.files[0]) {
          //console.log(fileInput.files[0].name)
          //Creamos un objeto Form
          const formData = new FormData();
          //file0 es el nombre que espera el backend en el body
          formData.append("file0", fileInput.files[0]);
          const { data } = await redSocialApi.post(
            `publication/upload/${idPublication}`,
            formData,
            {
              headers: {
                Authorization: auth.token,
              },
            }
          );
          console.log("respuesta", data);
          if (data.status === "success") {
            imageNameUpload = data.file.filename;
          }
        }

        console.log("Publicacion grabada exitosamente");
        //Si se ingreso imagen para actualizar hago esta validacion para definir el nombre del archivo que va a ir en el state profile
        //imageNameUpload = (imageNameUpload) ? imageNameUpload : profile.image;
        setIsSaved(true);
        await getCounters(auth.id, auth.token);
        const myForm: HTMLFormElement =
          document.querySelector("#form-publication")!;
        myForm.reset();
        setTimeout(() => {
          setIsSaved(false);
        }, 3000);

        //TODO Refresh publications profile
        getPublication(auth.id,1,"onRefresh")
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      message = error.response.data.message;
      setShowError(true);
      setErrorMessage(message);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 2,
        }}
      >
        <Grid item sx={{ marginLeft: 2 }}>
          <Typography variant="h1" component="h1">
            Hola, {profile.name}
          </Typography>
        </Grid>
      </Grid>

      <Divider variant="middle" />
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        <Grid item>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: 0,
            }}
          >
            <Grid item>
              <Box
                component="img"
                sx={{ height: 60, border: 0, paddingRight: 2 }}
                alt="Logo"
                src={
                  profile.image === "default.png"
                    ? avatar
                    : `http://127.0.0.1:3900/api/user/avatar/${profile.image}`
                }
              />
            </Grid>
            <Grid item>
              <Link to={`/social/perfil/${profile.id}`}>
                <Typography
                  variant="h1"
                  component="h1"
                >{`${profile.name} ${profile.surname}`}</Typography>
                <Typography variant="h2" component="h2">
                  {profile.nick}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={3}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid item>
              <Link to={`siguiendo/${auth.id}`}>
                <Typography variant={"subtitle1"}>Siguiendo</Typography></Link>
                <Typography variant={"h3"} textAlign={"center"}>
                  {counter.following}
                </Typography>
              
            </Grid>
            <Grid item>
              <Link to={`seguidores/${auth.id}`}>
                <Typography variant={"subtitle1"}>Seguidores</Typography></Link>
                <Typography variant={"h3"} textAlign={"center"}>
                  {counter.followed}
                </Typography>
              
            </Grid>
            <Grid item>
              <Link to={`/social/perfil/${profile.id}`}>
                <Typography variant={"subtitle1"}>Publicaciones</Typography></Link>
                <Typography variant={"h3"} textAlign={"center"}>
                  {counter.publication}
                </Typography>
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 0,
        }}
        border={0}
      >
        <Grid item xs={12} border={0}>
          {/* formulario*/}
          <form
            id="form-publication"
            onSubmit={handleSubmit((data) => onSavePublication(data))}
            noValidate
          >
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 0,
                width: 400,
                marginTop: 0,
              }}
              marginLeft={2}
            >
              <Grid item xs={12}>
                {showError && (
                  <Chip
                    label={errorMessage}
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                    sx={{ display: "flex" }}
                  />
                )}

                {isSaved && (
                  <Chip
                    label="Publicacion ingresada"
                    color="success"
                    icon={<FaceIcon />}
                    className="fadeIn"
                    sx={{ display: "flex" }}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Que estas pensando hoy "
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  //defaultValue={''}
                  sx={{ paddingTop: 2, border: 0 }}
                  {...register("text", {
                    //required: "Contraseña es requerida",
                    minLength: {
                      value: 1,
                      message: "Debe de ingresar el texto de la publicacion",
                    },
                  })}
                  error={errors.text ? true : false}
                  helperText={errors.text?.message}
                />
              </Grid>

              <Grid item>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid item>
                    <TextField
                      type="file"
                      //label="Avatar"
                      variant="outlined"
                      id="file"
                      //accept="image/*" //No existe esa prop en el componente TextField
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"

                  //fullWidth
                >
                  Grabar Publicacion
                </Button>
              </Grid>
            </Grid>
          </form>
          {/* formulario */}
        </Grid>
      </Grid>
    </>
  );
};
