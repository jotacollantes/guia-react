


//Esto es una constante pero con el typeof le dice a la variable el tipo que es, tal cual como lo hace una interface o un type
export const StructureState=[
{
id:1,
titulo:'contra',
descripcion:'excelente juego'
}
] 


type ActionType=
|{type:"crear",payload:{id:number,titulo:string,descripcion:string}}
|{type:"borrar",payload:{id:number}}
|{type:"editar",payload:{id:number,titulo:string,descripcion:string}}

export const JuegoReducer = (state: typeof StructureState,action:ActionType) => {
      //console.log(action.type,action.payload)

         


        switch (action.type) {
            case "crear":
                //Devolvemos un nuevo objeto rompiendo la referencia 
                
                // let newArray=[...state]
                // newArray.push(action.payload)
                // console.log('desde el reducer: ',newArray)
                // return  newArray;
                return[...state,action.payload]
                
                break;

            case "borrar":
                   
                   let nuevoArray = state.filter((juego)=>juego.id !== action.payload.id)
                    return nuevoArray
                    break;
            case "editar":
                const codigo = state.findIndex((juego)=>juego.id===action.payload.id)
                state[codigo]=action.payload
                console.log('desde el reducer',state)
                return[...state]
                
                
            default:
               return state;
        }
}

export const init:any =()=>{
    let elementos:any=localStorage.getItem('juegos')||''
  
    if(!elementos)  {
       return [];
     } 
     else{
       
         
         return JSON.parse(elementos)
     }
}