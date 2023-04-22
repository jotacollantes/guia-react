
import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useReducer } from "react";
import { mapReducer } from "./mapReducer";

export interface MapState {
    isMapReady:boolean,
    map?: Map,
}

const INITIAL_STATE: MapState ={
    isMapReady:false,
    map:undefined
}
interface Props{
    children:JSX.Element|JSX.Element[]
}

export const MapProvider = ({children}:Props) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)


    const setMap=(map:Map)=>{

        //Location Popup
        const myLocationPopup = new Popup()
            .setHTML(`<h4>Aqui Estoy</h4><p>En algun lugar del mundo</p>`)
        //Ubicar marcador
        new Marker({color:'#61DAFB'})
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map)
        dispatch({type:'setMap',payload:map})
    }


  return (
    
        <MapContext.Provider value={{...state,setMap}}>
            {children}
        </MapContext.Provider>
  )
}
