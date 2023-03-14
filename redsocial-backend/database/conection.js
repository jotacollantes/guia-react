import mongoose from 'mongoose'

export const conection={}

conection.start=async()=>{
    
    try {
        await mongoose.connect('mongodb://localhost:27017/red_social')
        console.log('Conectado correctamente')
    } catch (error) {
        console.log(error)
        throw new Error("No se conecto a la base de datos")
    }
}

//module.exports={conection}