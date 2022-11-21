import { createSlice, PayloadAction } from "@reduxjs/toolkit";




export interface PokemonState {
  page: number,
  pokemons: [],
  isLoading: boolean,
}


// type actionSetPokemon =
// {
//   payload:{
//     page: number,
//     pokemons: [],
//     }
// }

type actionSetPokemon =
{
page: number,
pokemons: [],
    
}
//no necesita esta interface o type :PokemonState de igual manera donde se invoque al reducer van a aparecer las propiedades del state
const initialState:PokemonState = {
  page: 0,
  pokemons: [],
  isLoading: false,
}
export const pokemonSlice = createSlice({
  name: "pokemonSlice",
  initialState,
  reducers: {
    startLoadingPokemons: (state /* action */) => {
      state.isLoading = true;
    },
   
    setPokemons: (state, action:PayloadAction<actionSetPokemon>) => {
      console.log("entro al setPokemons");
      state.isLoading=false;
      state.page=action.payload.page;
      state.pokemons=action.payload.pokemons
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions;
