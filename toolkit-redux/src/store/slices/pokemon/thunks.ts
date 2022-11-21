
import { pokemonApi } from "../../../api/pokemonApi"
import { AppDispatch, RootState } from "../../store"
import { setPokemons, startLoadingPokemons } from "./"


export const getPokemons=(page:number=0):any=>{
 
    return  async(dispatch:AppDispatch,getState:RootState)=>{

        
        //Cambiamos el isLoading
        dispatch(startLoadingPokemons())
        
        //*Realizar la peticion http con fetch
        // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
        // const data=await resp.json()
        // console.log(data)



       
        //!Podemos usar el objeto pokemonApi que es una instamcia de Axios
        const {data} = await pokemonApi.get(`pokemon?limit=10&offset=${page * 10}`)
        console.log(data)
        
      
 
        //!setPokemons recibira como argumento un objeto que equivale al action.payload en las acciones dentro de los reducer en el slice
        //Dispatch setPokemons
        dispatch(setPokemons({page:page+1, pokemons:data.results}))


    }
}