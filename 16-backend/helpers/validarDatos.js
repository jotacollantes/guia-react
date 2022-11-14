const validator=require('validator');

const validarDatos =(params)=>{
    
  
    //const {titulo,contenido}=params;
    console.log(params)

    let validarTitulo=!validator.isEmpty(params.titulo) && validator.isLength(params.titulo,{min:5,max:undefined})


    let validarContenido=!validator.isEmpty(params.contenido) 
   


  if (!validarTitulo || !validarContenido)
   {
        
        //throw new Error('Faltan Datos')
        throw "Faltan datos por enviar"

    }
    
}
module.exports=
{
    validarDatos
}