import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { redSocialApi } from "../../api";
import { isEmail } from "../../helpers/validation";
import { useAuth } from "../../hooks/useAuth";
import FaceIcon from "@mui/icons-material/Face";
import avatar from "../../assets/img/user.png";

type FormData = {
  name: string;
  surname: string;
  nick: string;
  bio: string;
  email: string;
  password: string;
};
export const Settings = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { profile, auth, setProfile } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const onUpdateUser = async ({
    name,
    email,
    surname,
    nick,
    password,
    bio,
  }: FormData) => {
    //setShowError(false);

    let message = "";

    try {
      const { data } = await redSocialApi.put(
        `user/update`,
        JSON.stringify({ name, email, surname, nick, password, bio }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      );
      //console.log('respuesta',data)
      if (data.status === "success") {
        //Subida de imagenes
        //Mapeamos el input de la imagen
        let imageNameProfile = "";
        const fileInput: any = document.querySelector("#file");
        if (fileInput.files[0]) {
          //console.log(fileInput.files[0].name)
          //Creamos un objeto Form
          const formData = new FormData();
          //file0 es el nombre que espera el backend en el body
          formData.append("file0", fileInput.files[0]);
          const { data } = await redSocialApi.post(`user/upload`, formData, {
            headers: {
              Authorization: auth.token,
            },
          });
          if (data.status === "success") {
            imageNameProfile = data.file.filename;
          }
          //console.log('respuesta',data)
        }

        console.log("Usuario actualizado exitosamente");
        //Si se ingreso imagen para actualizar hago esta validacion para definir el nombre del archivo que va a ir en el state profile
        imageNameProfile = imageNameProfile ? imageNameProfile : profile.image;
        setIsSaved(true);
        setProfile({
          id: auth.id,
          name,
          surname,
          nick,
          email,
          image: imageNameProfile,
          bio,
        });
        setTimeout(() => {
          setIsSaved(false);
        }, 3000);
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
          justifyContent: "center",
          marginTop: 3,
        }}
        border={0}
      >
        <Grid item xs={6} border={0}>
          {/* formulario*/}
          <form
            onSubmit={handleSubmit((data) => onUpdateUser(data))}
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
                marginTop: 2,
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h1" component="h1">
                  Ajustes de Usuario
                </Typography>

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
                    label="Usuario Actualizado"
                    color="success"
                    icon={<FaceIcon />}
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
                  defaultValue={profile.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Apellido"
                  variant="outlined"
                  //variant="filled"
                  fullWidth
                  {...register("surname", {
                    required: "Apellido es requerido",
                    minLength: {
                      value: 2,
                      message: "Apellido debe de ser de 2 o mas caracteres",
                    },
                  })}
                  error={errors.surname ? true : false}
                  helperText={errors.surname?.message}
                  defaultValue={profile.surname}
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
                  defaultValue={profile.nick}
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
                  defaultValue={profile.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue={profile.bio}
                  //sx={{paddingTop:1}}

                  {...register("bio")}
                  //error={errors.bio ? true : false}
                  //helperText={errors.bio?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  {...register("password", {
                    //required: "Contraseña es requerida",
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
                  Actualizar Usuario
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
