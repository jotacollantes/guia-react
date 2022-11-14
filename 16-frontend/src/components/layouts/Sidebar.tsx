import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"



export const Sidebar = () => {
    const navegar=useNavigate()
    const buscarArticulo=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const dato= e.currentTarget.buscador.value
        navegar(`/buscar/${dato}`,{replace:true})

    }
  return (

        <aside className="lateral">
    <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={(e)=>buscarArticulo(e)}>
            <input type="text" name="buscador"/>
            <button>Buscar</button>
        </form>
    </div>
    {/* <div className="add">
        <h3 className="title">Añadir pelicula</h3>
        <form>
            <input type="text" placeholder="Titulo" />
            <textarea name="" placeholder="Descripcion"></textarea>
            <input type="submit" value="Guardar" />
        </form>

    </div> */}
</aside>
    
    
  )
}
