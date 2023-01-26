import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { useContext, useState } from "react";
import { IMovie } from "../../interfaces";
import { MovieContext } from "../../context/movie";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: IMovie; // Solo es uno
}

export const MovieCard = ({ movie }: Props) => {
  //! Este state isImageLoaded nos va a ayudar a que primero se carguen las imagenes y luego el Box que contiene los Typography

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { setMovie } = useContext(MovieContext);
  const navigate = useNavigate();
  const viewMovie = (movie: IMovie) => {
    //console.log(movie);
    setMovie(movie);
    navigate("/movie");
  };

  return (
    //!Si es xs solo se mostrara 2 productos si es de sm en adelante solo se mostrara 3 productos
    <Grid item xs={6} sm={4}>
      <Card>
        {/* <NextLink href={`/product/${product.slug}`} passHref legacyBehavior prefetch={false}>
          <Link> */}

        <CardActionArea>
          <CardMedia
            component={"img"}
            //image={`products/${product.images[0]}`}
            image={`${movie.Poster}`}
            alt={movie.Title}
            className="fadein"
            onLoad={() => setIsImageLoaded(true)}
            onClick={() => viewMovie(movie)}
          />
        </CardActionArea>
        {/* </Link>
        </NextLink> */}
      </Card>
      {/* Los estilos los toma de /styles/global.css */}
      {/* El state isImageLoaded nos va a ayudar a que primero se carguen las imagenes y luego el Box que contiene los Typography */}
      <Box
        sx={{ margintop: 1, display: isImageLoaded ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>Titulo: {movie.Title}</Typography>
        <Typography fontWeight={500}>Año {movie.Year}</Typography>
        <Typography fontWeight={500}>IMDB ID: {movie.imdbID}</Typography>
      </Box>
    </Grid>
  );
};
