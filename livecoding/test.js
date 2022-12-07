//* Problema: Se requiere escribir un algoritmo que pueda leer y escribir valores en un cierto path determinado de un objeto cuya estructura es desconocida.

//* Tareas:
//* Definir e implementar unit tests
//* Escribir el algoritmo

// *Signature:
// *deepGet(object, path) : any


// *Ejemplo: 

//! nombre del 1er nieto del 2do hijo
const deepGet = (obj, sonIndex,grandSonsIndex) =>
{
   
    try {
          return  obj[sonIndex].grandsons[grandSonsIndex].name
    } catch (error) {
        return 'Hijo no existe'
    }
}

const sons =[{
    grandsons : [{
         name: "Juan Jose"
     }]

}]

//console.log(deepGet(sons,`sons[0].grandsons[0].name)`))
console.log(deepGet(sons,1,1))
