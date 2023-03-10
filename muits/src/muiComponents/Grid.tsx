import { Container } from "@mui/system";
import React from "react";
import Grid from "@mui/material/Grid";


export const GridMui = () => {
  return (
    <Container sx={{ mt: 5 }}>
      {/* Grid container representa una fila, una fila representa 12 columnas */}
      <Grid container spacing={2}>
        {/* Grid container  representa una columna */}
        {/* En tamaños xs ocupa las 12 columas */}
        <Grid item xs={12} sm={6}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti sunt hic totam aliquam, dicta est, quasi ut, eos culpa provident dolorem delectus dolores. Porro dolorum possimus nam sed rerum ipsa!
        </Grid>
        <Grid item xs={12} sm={6}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti sunt hic totam aliquam, dicta est, quasi ut, eos culpa provident dolorem delectus dolores. Porro dolorum possimus nam sed rerum ipsa!
        </Grid>

         <Grid item xs={12} sm={12}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti sunt hic totam aliquam, dicta est, quasi ut, eos culpa provident dolorem delectus dolores. Porro dolorum possimus nam sed rerum ipsa!
        </Grid>
      </Grid>
      
      
       
       
      
    </Container>
  );
};
