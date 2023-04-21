import React from 'react'
import ReactDOM from 'react-dom/client'

import { MapsApp } from './MapsApp.tsx'


import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1Ijoiampjb2xsYW50ZXMiLCJhIjoiY2xncXZzbmQxMHZjYjNkczh4MDdtc2g5YSJ9.g7qaQgleN_TNbv-Cv7tkRA';

if (!navigator.geolocation){
  alert('Tu navegador no tiene opcion a geolocalizacion')
  throw new Error('Tu navegador no tiene opcion a geolocalizacion')
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <MapsApp/>
  </React.StrictMode>,
)
