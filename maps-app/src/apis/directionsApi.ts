import axios from "axios";

export const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview:"simplified",
    steps:'false',
    access_token:
      "pk.eyJ1Ijoiampjb2xsYW50ZXMiLCJhIjoiY2xncXZzbmQxMHZjYjNkczh4MDdtc2g5YSJ9.g7qaQgleN_TNbv-Cv7tkRA",
  },
});