const mongoose =require("mongoose");
const conexion= async()=>{

    try {
        await mongoose.connect("mongodb://localhost:27017/mi_blog")
        //Parametros dentro del objeto en caso de error//
        //useNewUrlParser:true
        //useUnifiedTopology:true
        //useCreateIndex:true
        console.log("Conexion DB exitosa")

    } catch (error) {
        console.log(error)
        throw new Error (`No se ha podido conectar a la base de datos ${error}`)
    }
}

module.exports ={
    conexion
}