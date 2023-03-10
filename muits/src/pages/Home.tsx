import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
export const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Typography variant="h6" component={"h1"}>
        Home
      </Typography>
      <Box sx={{ display: "grid", gap: "1rem" }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Esta es una alerta
        </Alert>
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small">
              X
            </Button>
          }
        >
          This is a warning alert — check it out!
        </Alert>
        <Alert
          severity="info"
          action={
            <>
              <Button color="inherit" size="small">
                Create
              </Button>
              <Button color="inherit" size="small">
                Delete
              </Button>
            </>
          }
        >
          This is an info alert — check it out!
        </Alert>

        {/* <Collapse in={open}>
        <Alert severity="success"
         onClose={() => {setOpen(false)}}
        >
          This is a success alert — check it out!
        </Alert>
        </Collapse> */}

        {/* <Collapse in={open}>
        <Alert
        severity="success"
         onClose={() => {setOpen(false)}}
         icon={<AutorenewIcon fontSize="inherit" />}
         variant={'outlined'}
        >
          This is a success alert — check it out!
        </Alert>
        </Collapse> */}

         

        {
          (!open)
          ?<Button variant="contained"
        onClick={() => setOpen(true)}>
          Open
        </Button>
        : <Button variant="outlined"
        onClick={() => setOpen(false)}>
          Close
        </Button> 
        }  
        
          
         
       

        <Snackbar open={open}
        autoHideDuration={2000}
        onClose={()=>{setOpen(false)}}
        >
          <Alert severity="success" variant={"filled"}>
            <AlertTitle>Error</AlertTitle>
            This is a success alert — check it out!
          </Alert>
        </Snackbar>
      </Box>
      {/* <Box sx={{ width: '100%',mt:5}}>
      
      
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button>
    </Box> */}
    </>
  );
};
