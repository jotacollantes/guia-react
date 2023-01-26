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
import { ItemCounter } from "../components/movies";
import { BlockBusterLayout } from "../components/layouts";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";

export const Movie = () => {

const { movie } = useContext(MovieContext);
const { addMovieToCart} = useContext(CartContext);
const navigate = useNavigate();

  //const {cart,addProductToCart} = useContext(CartContext)


useEffect(() => {
//console.log(JSON.stringify(movie))
if(movie.Title==="")
{
    navigate("/")
}
  
}, [])


 const [tempCartMovie, setTempCartMovie] = useState<ICartMovie>({
    title: movie.Title,
    imdbid: movie.imdbID,
    quantity: 1,
  });



  const onUpdateQuantity = (quantity: number) => {
    //console.log('entra por aqui')
    setTempCartMovie({
      ...tempCartMovie,
      quantity,
    });
  };

    const addMovieCart=()=>
    {
      
      //Todo: Llamar a la accion del context para agregar al carrito
      addMovieToCart(tempCartMovie)
      //console.log(tempCartProduct)
      navigate("/cart");
    }
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
                //onLoad={() => setIsImageLoaded(true)}
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
            <Typography variant="subtitle1" component={"h2"}>IMDB ID: 
              {movie.imdbID}
            </Typography>
            {/* Cantidad */}
            {/* Margen arriba y abajo */}
            <Box sx={{ my: 2 }}>
              
              {/* Item Counter */}
              <ItemCounter
                //!incrementar o decrementar definida en la Prop del componente hijo ItemCounter emite el argumento (value)

                currentValue={tempCartMovie.quantity}
                maxValue={6}
                updatedQuantity={onUpdateQuantity}
              />
            </Box>

            {
              //! Para mostrar que no hay disponibilidad

              <Button
                color="primary"
                className="circular-btn"
               
                onClick={addMovieCart}
              >
                Agregar al Carrito
              </Button>
            }

        
          </Box>
        </Grid>
      </Grid>
    </BlockBusterLayout>
  );
};
