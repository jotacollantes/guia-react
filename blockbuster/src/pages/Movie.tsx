import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movie";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

// import { CartContext } from "../../context";
import { ICartMovie, IMovie } from "../interfaces";
import { ItemCounter, Modalidad } from "../components/movies";
import { BlockBusterLayout } from "../components/layouts";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";

export const Movie = () => {
  const { movie } = useContext(MovieContext);
  const { addMovieToCart } = useContext(CartContext);
  const navigate = useNavigate();

  //const {cart,addProductToCart} = useContext(CartContext)

  useEffect(() => {
    //console.log(JSON.stringify(movie))
    if (movie.Title === "") {
      navigate("/");
    }
  }, []);

  const [tempCartMovie, setTempCartMovie] = useState<ICartMovie>({
    title: movie.Title,
    imdbid: movie.imdbID,
    quantity: 1,
    image: movie.Poster,
    modalidad:'venta',
    fechaEntrega:''
  });

  const onUpdateQuantity = (quantity: number) => {
    //console.log('entra por aqui')
    setTempCartMovie({
      ...tempCartMovie,
      quantity,
    });
  };


const onUpdateModalidad =(modalidad:string)=>{
 //console.log("Modalidad",value)
  setTempCartMovie({
    ...tempCartMovie,
    modalidad: modalidad,
    fechaEntrega:''
  });
}

const onUpdateFechaEntrega=(value:string)=>{
  setTempCartMovie({
    ...tempCartMovie,
    fechaEntrega:value,
  });

}

  const addMovieCart = () => {
    //!Llamar a la accion del context para agregar al carrito
    addMovieToCart(tempCartMovie);
    //console.log(tempCartProduct)
    navigate("/cart");
  };

  console.log(tempCartMovie)
  return (
    <BlockBusterLayout>
      <Grid container sx={{ mt: 10 }} spacing={3}>
        <Grid item xs={12} sm={7} border={0}>
          <Card>
            <CardActionArea>
              <CardMedia
                component={"img"}
                image={`${movie.Poster}`}
                alt={movie.Title}
                className="fadein"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5} border={0}>
          <Box display={"flex"} flexDirection="column" sx={{ mr: 0 }}>
            <Typography variant="h1" component={"h1"}>
              {movie.Title}
            </Typography>
            <Typography variant="h1" component={"h1"}>
              {movie.Year}
            </Typography>
            <Typography variant="subtitle1" component={"h2"}>
              IMDB ID:
              {movie.imdbID}
            </Typography>
           
            <Box sx={{ my: 2 }}>
              {/* Item Counter */}
              <ItemCounter
                currentValue={tempCartMovie.quantity}
                maxValue={6}
                updatedQuantity={onUpdateQuantity}
              />
            </Box>
            <Box sx={{ my: 1 }}>
              {/* Modalidad */}
              <Modalidad modalidad={onUpdateModalidad} fechaEntrega={onUpdateFechaEntrega} />
            </Box>

            <Button
              color="primary"
              className="circular-btn"
              onClick={addMovieCart}
            >
              Agregar al Carrito
            </Button>
          </Box>
        </Grid>
      </Grid>
    </BlockBusterLayout>
  );
};
