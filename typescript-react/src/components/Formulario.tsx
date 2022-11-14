import { useForm } from '../hooks/useForms';

interface FormData {
    email:string,
    nombre:string,
    edad:number
}
export const Formulario = () => {
    
    //!La interface es opcional, typescript va a inferir el tipo de dato segun el valor en el objeto de initState

    const {email,nombre,edad,formulario,handlerEvent}=useForm<FormData>({
                email:'juan@collantes.ec',
               nombre:'juan collantes',
            edad:35})
  return (
    <>
        <h1>Formulario</h1>
        <form autoComplete='off'>
            <div className='mb-3'>
                <label className='form-control'>Email</label><br />
                <input onChange={(e)=>{
                    return handlerEvent(e);
                }} type="email" className='form-control' name='email' value={email}/>
            </div>
            <div className='mb-3'>
                <label className='form-control'>Nombre</label><br />
                <input onChange={handlerEvent}
                type="text" className='form-control' name='nombre' value={nombre}/>
            </div>
            <div className='mb-3'>
                <label className='form-control'>Edad</label><br />
                <input onChange={handlerEvent}
                type="number" className='form-control' name='edad' value={edad}/>
            </div>

        </form>
        <pre>{JSON.stringify(formulario)}</pre>
        </>
  )
}
