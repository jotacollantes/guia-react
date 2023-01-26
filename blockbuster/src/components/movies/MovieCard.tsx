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
       

        <CardActionArea>
          <CardMedia
            component={"img"}
            
            image={`${movie.Poster}`}
            alt={movie.Title}
            className="fadein"
            onLoad={() => setIsImageLoaded(true)}
            onClick={() => viewMovie(movie)}
          />
        </CardActionArea>
       
      </Card>
     
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
