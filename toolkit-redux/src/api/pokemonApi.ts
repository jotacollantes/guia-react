import axios from 'axios'



//*Se crea un instancia de AXIOS y con el export se pued eusar el objeto donde sea que se lo importe
export const pokemonApi=axios.create(
    {
    baseURL: 'https://pokeapi.co/api/v2/'
   }
    
)