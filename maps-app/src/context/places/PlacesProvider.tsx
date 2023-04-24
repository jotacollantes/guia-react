import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/placesResult";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces:boolean;
  places: Feature []
}
export interface Props {
  children: JSX.Element | JSX.Element[];
}
const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces:false,
  places: []
};
export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then(
      //Como se resuelve ejecuto el metodo then que me proporciona el valor de coords (que es un array con las coordenadas devuelta por el resolv de la promesa)
      (coords) => {
        dispatch({ type: "setUserLocation", payload: coords });
      }
    );
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0) {
      //Todo: limpiar places en state
      dispatch({type:'setPlaces',payload:[]})
      return []
    }
    if (!state.userLocation) throw new Error("No hay ubicacion del usuario");
    //console.log('searchPlacesByTerm: ',`/${query}.json`)


    dispatch({type:'setLoadingPlaces'})
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      //Añado el param proximity  a los demas params especificados en la configuracion por defecto en searchApi.
      params: {
        proximity: state.userLocation?.join(","),
      },
    });
    //console.log(resp.data.features[0])
    dispatch({type:'setPlaces',payload:resp.data.features})
    return resp.data;
  };

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>
      {children}
    </PlacesContext.Provider>
  );
};
