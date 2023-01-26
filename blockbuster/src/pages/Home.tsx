import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { blockbusterApi } from '../api';
import { BlockBusterLayout } from '../components/layouts/BlockBusterLayout';
import { MovieList } from '../components/movies';
import { FullScreenLoading } from '../components/ui';
import { IMovie, OMDBType } from '../interfaces';

export const Home = () => {


   const [movies, setMovies] = useState<any>([{
    Title:  "",
    Year:   "",
    imdbID: "",
    Type:   "",
    Poster: "",
   }])
   
   const [isLoading, setIsLoading] = useState<boolean>(true)

   const fetchMovies=async():Promise<IMovie[]|null>=>{

    try {
      
      const {data} = await blockbusterApi.get<OMDBType>(`?i=tt3896198&apikey=5eec5adc&s=scary`)
      //console.log(JSON.stringify(data.Search))
      return data.Search
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      return null
    }
     

   }
  useEffect(() => {
    setIsLoading(true)
    setTimeout(async () => {
       setMovies(await fetchMovies());
      setIsLoading(false)
    }, 1000)
    
    
     
    }
  , [])
  
  
  return (
   
    <BlockBusterLayout>
       {/* <Typography variant="h1" component="h1">
        Pagina de Inicio
      </Typography> */}
    {
      isLoading ?
      <FullScreenLoading/>:
      <MovieList movies={movies} />

    
     
    }

    </BlockBusterLayout>

  )
}
