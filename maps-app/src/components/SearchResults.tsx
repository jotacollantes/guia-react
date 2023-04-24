
import { useState } from "react";
import { LoadingPlaces } from ".";
import { useMap, usePlaces } from "../hooks";
import { Feature } from "../interfaces/placesResult";

export const SearchResults = () => {
  const { isLoadingPlaces, places,userLocation } = usePlaces();
  const {map,getRouteBetweenPoints}=useMap()
  const [activeId, setActiveId] = useState('')

  //Para Volar a la ubicacion seleccionada
  const onPlaceClicked=(place:Feature)=>{
    //console.log('onPlaceClicked: ',place)
    setActiveId(place.id)
    const [lng,lat]=place.center;
    //Uso el map que esta en el contexto MapContex por medio del hook useMap()
    map?.flyTo({
      zoom:14,
      center:[lng,lat]
    })
  }


 const getRoute=(place:Feature)=>{
  if(!userLocation)throw new Error('Ubicacion actual no disponible')
  const [lng,lat]=place.center;
  getRouteBetweenPoints(userLocation,[lng,lat])
 }

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }
  //Para que no aparezca el espacio entre el text field y los resultados

  if (places.length === 0) {
    return <></>;
  }
  return (
    <ul className="list-group mt-3">
      {places.map((place, ix) => {
        return (
          <li
          key={ix}
          onClick={()=>onPlaceClicked(place)}
          className={`list-group-item list-group-item-action pointer ${(activeId===place.id)?'active':''}`}
          >
            <h6>{place.text_es}</h6>
            <p  style={{ fontSize: "12px" }}>
              {place.place_name_es}
            </p>
            <button
            className={`btn btm-sm ${(activeId===place.id)?'btn-outline-light':'btn-outline-primary'}`}
            onClick={()=>getRoute(place)}
            >
              Direcciones:
            </button>
          </li>
        );
      })}
    </ul>
  );
};
