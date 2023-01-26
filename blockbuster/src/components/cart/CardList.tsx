import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import React, { useContext } from "react";
import { CartContext } from "../../context/cart";

export const CardList = () => {
  const { cart } = useContext(CartContext);

  const moviesToShow = cart;
  return (
    <>
      {moviesToShow.map((movie, ix) => {
        return (
          <Grid container spacing={2} key={ix} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <CardActionArea>
                <CardMedia
                  image={movie.image}
                  component="img"
                  sx={{ borderRadios: "5px" }}
                ></CardMedia>
              </CardActionArea>
            </Grid>
            <Grid item xs={7}>
              <Box display={"flex"} flexDirection="column">
                <Typography variant="body1" sx={{fontWeight: 'bold'}}>{movie.title}</Typography>
                <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                  IMDB: {movie.imdbid}
                </Typography>

                <Typography variant="body1" sx={{fontWeight: 'bold'}}>Cantidad: 
                  {movie.quantity} {movie.quantity === 1 ? "Item" : "Items"}
                </Typography>
                <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                  Modalidad: {movie.modalidad} 
                </Typography>
                {
                  movie.modalidad==='alquiler' ?
                  (
                    <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                  Fecha de Entrega: {movie.fechaEntrega} 
                </Typography>
                  )
                  : <></>
                }




              </Box>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
