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
    const {cart} = useContext(CartContext)
  
  

  

  
    const moviesToShow=cart
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
                  <Typography variant="body1">{movie.title}</Typography>
                  <Typography variant="body1">
                    IMDB: <strong>{movie.imdbid}</strong>
                  </Typography>
  
                 
                    <Typography variant="h6">{movie.quantity} {movie.quantity ===1 ? 'Item' :  'Items'}</Typography>
                 
                </Box>
              </Grid>
              
            </Grid>
          );
        })}
      </>
    );
  };
