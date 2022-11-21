import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { getPokemons } from "./store/slices/pokemon/";

export const PokemonApp = () => {
  const { isLoading, pokemons,page } = useSelector((state: RootState) => state.pokemonReducer
  );
  
  const dispatch = useDispatch();

  const [cargando, setCargando] = useState<boolean>(true);
  useEffect(() => {

        setTimeout(() => {
          dispatch(getPokemons(0));
          setCargando(false);
        }, 4000);
        
  }, []);

  return (
    <>
      <h1>PokemonApp</h1>
      <hr />

      {
        (cargando) ? <h1>Cargando.....</h1> : (
          <> 
          {/* isLoading viene del Store */}
          <span> State isLoading : {isLoading? 'true' : 'false'}</span> 
          <ul>
        {pokemons.map((pokemon: any, index) => {
          return <li key={index}>{pokemon.name}</li>;
        })}
      </ul>       
    
    <button onClick={()=>{
         dispatch(getPokemons(page + 1));
      }}>Siguiente</button>
      </>
   )
      }

      





      
    </>
  );
};
