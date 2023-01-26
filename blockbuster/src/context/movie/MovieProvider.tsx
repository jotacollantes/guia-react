
import React, { useReducer } from 'react';
import { IMovie } from '../../interfaces';
import { MovieContext,movieReducer } from './';


export interface MovieState{
    movie: IMovie;
}


interface Props{
children:JSX.Element|JSX.Element[]
}

//Inicializamos
const MOVIE_INITIAL_STATE:MovieState={
    movie:{
        Title:  "",
        Year:   "",
        imdbID: "",
        Type:   "",
        Poster: "",
    }
}


export const MovieProvider = ({children}:Props) => {
const [state, dispatch] = useReducer(movieReducer, MOVIE_INITIAL_STATE)
const setMovie =(movie:IMovie)=>{
    dispatch({type: "MOVIE - SetMovie",payload: movie })
}
return (
<MovieContext.Provider value={{...state,setMovie}}>
    {children}
</MovieContext.Provider>
)
}