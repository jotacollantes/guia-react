import mongoose from "mongoose";
//const URI="mongodb://localhost:27017/crud"
const URI="mongodb+srv://jjcollantes:Campeon2023*@cluster0.ntcmp.mongodb.net/crud"
export const conexionDB= async()=>{

    try {
        const db= await mongoose.connect(URI)
        //Parametros dentro del objeto en caso de error//
        //useNewUrlParser:true
        //useUnifiedTopology:true
        //useCreateIndex:true
        console.log(`Conexion DB: ${db.connection.name}`)

    } catch (error) {
        console.log(error)
        throw new Error (`No se ha podido conectar a la base de datos ${error}`)
    }
}

