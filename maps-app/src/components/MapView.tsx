
import { useLayoutEffect, useRef } from 'react'
import { Loading } from '.'
import { useMap, usePlaces } from '../hooks'
import mapboxgl from 'mapbox-gl'

export const MapView = () => {
  const {isLoading,userLocation} = usePlaces()
  const {setMap}=useMap()
  const mapDiv=useRef<HTMLDivElement>(null)


 //Uso el useLayoutEffect para esperar que todo los componentes en especial el DIV se haya cargado con toda su configuracion de estilos
// The signature is identical to useEffect, but it fires synchronously after all DOM mutations.
 useLayoutEffect(() => {
  if(!isLoading){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = new mapboxgl.Map({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container: mapDiv.current!, // container ID
      //container: "mydiv", // container ID
      //style: 'mapbox://styles/mapbox/streets-v12', // style URL
      style: 'mapbox://styles/mapbox/dark-v10', // style URL
      center: userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

      //integramos el mapa al MapContext
      setMap(map)
  }
   
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isLoading])

   
  if (isLoading){
    return (
      <Loading/>
    )
  }
  return (
    <div ref={mapDiv} style={{
      
      height:'100vh',
      width:'100vw',
      position:'fixed',
      top:0,
      left:0

    }}>
      {userLocation?.join(',')}
      </div>
  )
}
