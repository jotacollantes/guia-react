import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../helpers/Url";
import { ApiCall } from "../../helpers/ApiCall";
import {
  Articulo as TypeArticulo,
  Respuesta,
} from "../../intrfaces/interfaces";
import { ListArticulo } from "./ListArticulo";
import { useParams } from "react-router-dom";

export const Articulo = () => {
  //!En el useState articulos le pongo la firma (apariencia) con el type <TypeArticulo>, para inicializarlo con unobjeto vacio y para que no de problema le defino del tipo any
  const [articulo, setArticulo] = useState<TypeArticulo>({} as any );
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  useEffect(() => {
    setTimeout(() => {
      listarArticulo();
    }, 3000);
  }, []);

  const listarArticulo = async () => {
    const respuesta = await ApiCall(`articulo/${params.id}`, "GET");
    const { data } = respuesta;

    data.status === "success" ? setArticulo(data.articulo) : setArticulo({} as any );
    setCargando(false);
  };

  //console.log(respuesta.data.articulos);

  return (
    <div className="jumbo">
      {cargando ? (
        "Cargando..."
      ) : articulo ? (
        <>
        <div className="mascara">
          {articulo.imagen == "default.png" || articulo.imagen == "" ? (
            <img
              src="https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/687822/retina_1708x683_cover-react-context-api-4929b3703a1a7082d99b53eb1bbfc31f.png"
              alt=""
            />
          ) : (
            <img src={`${Url}imagen/${articulo.imagen}`} alt="" />
          )}
        </div>
          <h1>{articulo.titulo}</h1>
          <p>{articulo.titulo}</p>
          <p>{articulo.fecha}</p>
        </>
      ) : (
        <h1>No existe articulos</h1>
      )}
    </div>
  );
};
