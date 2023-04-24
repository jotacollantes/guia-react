import { createContext } from "react";
import { Feature, PlacesResponse } from "../../interfaces/placesResult";

export interface PlacesContextProps{
    isLoading: boolean,
    userLocation?:[number,number],
    isLoadingPlaces:boolean,
    places: Feature []
    //Methods
    searchPlacesByTerm: (query: string) => Promise<never[] | PlacesResponse>
}

export const PlacesContext=createContext({} as PlacesContextProps);