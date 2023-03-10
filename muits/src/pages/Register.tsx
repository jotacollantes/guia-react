import { Box, Button, TextField, Typography } from "@mui/material";
import React, { FormEvent,ChangeEvent, useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({error:false,message:''})
  const handledSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email))
    {
      console.log('email incorrecto')
      return setError({error:true,message:'Error en el correo'})
    }
    setError({error:false,message:''})
    console.log('Email Correcto');
  };

  const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>
  {
      setEmail(e.target.value)
  }

  const validateEmail=(email:string)=>{
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    //* Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
    return regex.test(email);
  }
  return (
    <>
      <Typography variant="h6" component={"h1"}>
        Register
      </Typography>
      {/* Al box le damos la capacidad de que se comporte como un formulario */}
      <Box
        component={"form"}
        onSubmit={(e) => {
          return handledSubmit(e);
        }}
      >
        <TextField
          id="email"
          label="email"
          type="email"
          fullWidth
          required
         
          error={error.error}
          helperText={error.message}
          onChange={(e)=>{
            return handleChange(e)
          }}
          value={email}
        />
        <Button type="submit" variant="outlined" sx={{ mt: 1 }}>
          Registrarse
        </Button>
      </Box>
    </>
  );
};
