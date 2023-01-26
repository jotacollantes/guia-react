import { createContext } from 'react';
import { IMovie } from '../../interfaces';


interface ContextProps {
      movie: IMovie;
      setMovie: (movie: IMovie) => void
      
}


export const MovieContext=createContext({} as ContextProps)