import { ChangeEvent, useRef } from 'react'
import { usePlaces } from '../hooks'
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
//const debounceRef=useRef<NodeJS.Timeout>()
const debounceRef=useRef<any>()

const {searchPlacesByTerm} =usePlaces()

const onQueryChanged=(event:ChangeEvent<HTMLInputElement>)=>{
    //console.log('Id del setimeout actual almacenado en el debouceRef.current',debounceRef.current)
    if (debounceRef.current){
        clearTimeout(debounceRef.current)
    }
    debounceRef.current=setTimeout(() => {
        //TODO buscar 
        searchPlacesByTerm(event.target.value)
        //console.log('debounce value:',event.target.value)
    }, 1000);
}

  return (
    <div className='search-container'>
        <input type="text"
        className='form-control'
        placeholder='Ingrese Lugar'
        onChange={onQueryChanged}
        />
        {/* Resultados */}
        <SearchResults/>
    </div>
  )
}
