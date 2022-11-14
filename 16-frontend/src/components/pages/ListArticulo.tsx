import { Link, Navigate, useNavigate } from "react-router-dom";
import { ApiCall } from "../../helpers/ApiCall";
import { Url } from "../../helpers/Url";
import { Articulo, Props } from "../../intrfaces/interfaces";

export const ListArticulo = ({
  _id,
  titulo,
  contenido,
  imagen,
  articulos,
  setArticulos,
}: Props) => {
  const borrarArticulo = async (id: string) => {
    //console.log(id);
    const {data}= await ApiCall(`articulo/${id}`,'DELETE')
    //console.log("borrado",data)
    //!Actualizar el estado con setArticulos que lo envio como props

    let newArticulos;
    newArticulos = articulos.filter(
      (articulo: Articulo) => articulo._id !== id
    );
    //console.log(newArticulos)
    setArticulos(newArticulos);
  };
   const navegar=useNavigate()
  return (
    <>
      <article className="articulo-item">
        <div className="mascara">
          {imagen == "default.png" || imagen == "" ? (
            <img
              src="https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/687822/retina_1708x683_cover-react-context-api-4929b3703a1a7082d99b53eb1bbfc31f.png"
              alt=""
            />
          ) : (
            <img src={`${Url}imagen/${imagen}`} alt="" />
          )}
        </div>
        <div className="datos">
          <h3 className="title">
            <Link to={`/articulo/${_id}`}>{titulo}</Link>
          </h3>
          <p className="description">{contenido}</p>
          <button className="edit" onClick={()=>{
            
            navegar(`/editar/${_id}`,{replace:true})
            
          }}>Editar</button>
          <button
            className="delete"
            onClick={() => {
              return borrarArticulo(_id);
            }}
          >
            Borrar
          </button>
        </div>
      </article>
    </>
  );
};
