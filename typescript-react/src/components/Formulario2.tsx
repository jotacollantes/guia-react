import { useForm } from "../hooks/useForms";


export const Formulario2 = () => {
    
    const {handlerEvent,postal,ciudad,formulario} =useForm({postal:'ABC',ciudad:'Guayaquil'})
  return (
    <>
        <h1>Formulario 2</h1>
        <form autoComplete='off'>
            <div className='mb-3'>
                <label className='form-control'>Codigo Postal</label><br />
                <input onChange={(e)=>{
                    return handlerEvent(e);
                }} type="text" className='form-control' name='postal' value={postal}/>
            </div>
            <div className='mb-3'>
                <label className='form-control'>Ciudad</label><br />
                <input onChange={handlerEvent}
                type="text" className='form-control' name='ciudad' value={ciudad}/>
            </div>

        </form>
        <pre>{JSON.stringify(formulario)}</pre>
        </>
  )
}
