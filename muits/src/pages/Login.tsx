import { Button, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import React from 'react'

export const Login = () => {
  const {enqueueSnackbar}=useSnackbar()
  const handleSnack=()=>{
    enqueueSnackbar("Esta es una alerta con notisatck",{variant:"success",
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    }
  })
  }
  return (
    <>
    <Typography variant={"h6"} component={"h1"}>Login</Typography>
    <Button variant={"contained"}
    onClick={()=>{
      return handleSnack()
    }}
    >Open</Button>
    </>
  )
}
