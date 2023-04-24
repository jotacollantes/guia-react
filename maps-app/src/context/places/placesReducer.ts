import { PlacesState } from ".."
import { Feature } from "../../interfaces/placesResult"

type PlacesAction =
|{type:'setUserLocation',payload:[number,number]}
|{type:'setLoadingPlaces'}
|{type:'setPlaces', payload:Feature[]}
export const placesReducer=(state:PlacesState,action:PlacesAction):PlacesState=>{
    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading:false,
                userLocation:action.payload
            }
            //break;
            case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces:true,
                //Purgamos los places porque estoy buscando nuevos places
                places:[]
               
            }
            case 'setPlaces':
                return {
                    ...state,
                    isLoadingPlaces:false,
                    //Purgamos los places porque estoy buscando nuevos places
                    places:action.payload
                   
                }
    
        default:
            return state
    }
}