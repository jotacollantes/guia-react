import { useEffect, useReducer } from "react"
import { PlacesContext } from "./PlacesContext"
import { placesReducer } from "./placesReducer"
import { getUserLocation } from "../../helpers"

export interface PlacesState{
    isLoading: boolean,
    userLocation?: [number,number]
}
export interface Props{
    children:JSX.Element|JSX.Element[]
}
const INITIAL_STATE: PlacesState =
{
    isLoading:true,
    userLocation:undefined
}
export const PlacesProvider = ({children}:Props) => {
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)
    
    useEffect(() => {
      getUserLocation().then(
        //Como se resuelve ejecuto el metodo then que me proporciona el valor de coords (que es un array con las coordenadas devuelta por el resolv de la promesa)
        (coords)=>{
            dispatch({type:'setUserLocation',payload:coords})
      })
      

    return
     
    }, [])
    

  return (
    <PlacesContext.Provider value={{...state}}>
{children}
    </PlacesContext.Provider>
  )
}
