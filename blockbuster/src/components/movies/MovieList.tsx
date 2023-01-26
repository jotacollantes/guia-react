import { Grid } from '@mui/material';
import { MovieCard } from '.';
import { IMovie} from '../../interfaces';
interface Props{
    movies:IMovie[]
}

export const MovieList = ({movies}:Props) => {
  //console.log(JSON.stringify(movies))
  return (
    <Grid container spacing={4}>
    {
      movies.map((movie,ix) => {
        
        return  <MovieCard key={ix} movie={movie}  />
      })
    }
     
    </Grid>
  )
}