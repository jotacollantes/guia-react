import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../helpers/Url";
import { ApiCall } from "../../helpers/ApiCall";
import { Articulo, Respuesta } from "../../intrfaces/interfaces";
import { ListArticulo } from "./ListArticulo";
import { useParams } from "react-router-dom";

export const Busqueda = () => {
  const [articulos, setArticulos] = useState<any>([]);
  const [cargando, setCargando] = useState(true);
  const params=useParams()
  useEffect(() => {
   
    setTimeout(() => {
      
      listarArticulos();
    }, 3000);
  }, []);


  useEffect(() => {
    setCargando(true)
    setTimeout(() => {
      
      listarArticulos();
    }, 3000);
  }, [params]);
  

  const listarArticulos = async () => {
    const respuesta = await ApiCall(`buscar/${params.busqueda}`, "GET");
    const { data } = respuesta;

    
   
    (data.status === "success" ) ? setArticulos(data.articulosEncontrados) : setArticulos([]);
    setCargando(false);
  };

  //console.log(respuesta.data.articulos);

  return (
    <>
      {
      cargando ? ("Cargando...") : 
      articulos.length >= 1 ?
      (
        articulos.map((articulo: Articulo, index: number) => 
        {
          return (
            <ListArticulo key={index} _id={articulo._id} titulo={articulo.titulo} contenido={articulo.contenido} imagen={articulo.imagen} articulos={articulos} setArticulos={setArticulos}/>);
        })
      ) : (<h1>No hay Articulos</h1>)
      }
    </>
  );
};