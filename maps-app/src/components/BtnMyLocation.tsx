import { useMap, usePlaces } from "../hooks"


export const BtnMyLocation = () => {
    const {map,isMapReady} =useMap()
    const {userLocation}=usePlaces()

  const onClick=()=>{
    //Volver a la ubicacion inicial
    if(!isMapReady) throw new Error('Mapa no esta listo')
    if(!userLocation) throw new Error('No hay ubicacion del usuario')

    map?.flyTo({
        zoom:14,
        center:userLocation
    })
  }
  return (
    <button
    onClick={onClick}
    className="btn btn-primary"
    style={{
        position:'fixed',
        top:'20px',
        right:'20px',
        //zIndex:999
    }}
    > 
        Mi ubicacion
    </button>
  )
}
