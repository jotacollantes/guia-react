const { Schema, model } =require('mongoose');

const ArticuloSchema=Schema({
    titulo : {
        type: String,
        required:true
    },
    contenido : {
        type: String,
        required:true
    },
    fecha : {
        type: Date,
        default:Date.now
    },
    imagen : {
        type: String,
        default:"default.png"
    }

})

//Articulo es el nombre del Modelo que usara el Schema ArticuloSchema
//Mongoose va a detectar que el modelo Articulo (Mayuscula y en singular) hace referencia a la coleccion articulos (minuscula y plural)
//!Si le especificamos el 3er argumento, es el nombre de la coleccion en mongoose 
module.exports=model("Articulo",ArticuloSchema,"articulos")
