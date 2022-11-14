import { Dispatch } from "react";

export interface Props {
  _id: string;
  titulo: string;
  contenido: string;
  imagen:string;
  //setArticulos:()=> void
  articulos:[];
  setArticulos:Dispatch<any>
}

export interface Articulo {
  _id: string;
  titulo: string;
  contenido: string;
  imagen:string;
  fecha?: string
}


// export interface Respuesta {
//   data: {
//     contador?: number;
//     status?: string;
//     articulos: Articulo[];
//   };
// }

//!no se sabe como viene la respuesta desde un backend
export interface Respuesta {
  [x: string]: any
}