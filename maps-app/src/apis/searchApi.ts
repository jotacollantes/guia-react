import axios from "axios";

export const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1Ijoiampjb2xsYW50ZXMiLCJhIjoiY2xncXZzbmQxMHZjYjNkczh4MDdtc2g5YSJ9.g7qaQgleN_TNbv-Cv7tkRA",
  },
});
