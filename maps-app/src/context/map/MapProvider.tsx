import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useEffect, useReducer } from "react";
import { mapReducer } from "./mapReducer";
import { usePlaces } from "../../hooks";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};
interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const { places } = usePlaces();
  //console.log("Places: ", places);
  useEffect(() => {
    //console.log('Places: ',places)
    //console.log("Markers: ", state.markers);

    //Hay que borrar los marcadores anteriores por cada nueva busqueda que se realiza. Para eso es necesario que los marcadores esten almacenados en el state markers
    state.markers.forEach((marker) => {
      return marker.remove();
    });
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      //Creamos el popup que sera usado en el nuevo marcador
      const popup = new Popup();
      popup.setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>`);
      //Creamos el nuevo marcador
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);
      newMarkers.push(newMarker);
    }
    //console.log(newMarkers);
    //Todo limpiar polylines
    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [places]);

  const setMap = (map: Map) => {
    //Location Popup
    const myLocationPopup = new Popup().setHTML(
      `<h4>Aqui Estoy</h4><p>En algun lugar del mundo</p>`
    );
    //Ubicar marcador
    new Marker({ color: "#61DAFB" })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);
    dispatch({ type: "setMap", payload: map });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    //console.log(resp)
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;
    const kms = Math.round((distance / 1000) * 100) / 100;
    const minutes = Math.floor(duration / 60);
    //console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, start);
    for (const coord of coords) {
      // Lng: coord[0], Lat: coord[1]
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }
    state.map?.fitBounds(bounds, { padding: 200 });
    //Polyline

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };
    //todo remover polilyne si existe
    if(state.map?.getLayer('RouteString')){
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    state.map?.addSource("RouteString", sourceData);

    //Configurar colores
    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "white",
        "line-width": 3,
      },
    });
  };
  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
