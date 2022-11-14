import { Schema, model } from 'mongoose'

const empleadoSchema = new Schema(
    {
        nombres: {
            type: String,
            required: true
        },

        apellidos: {
            type: String,
            required: true
        },

        id: {
            type: String,
            required: true
        },

        tcontrato: {
            type: String,
            required: true
        },
        // usuario: {
        //     type: String,
        //     required: true
        // },

        //! Normalmente la referencia como pueden ser varios registros, se define dentro de un arreglo []  [{ type: ObjectId, ref: 'User' }]. Como un empleado solo tiene un jefe, la referencia solo se define como un objeto y no como un arrar de objetos.
        usuario: { type: Schema.ObjectId, ref: 'usuario' }

        

      

    },
    {
        timestamps: true
    }
)

export const Empleado=model('empleado',empleadoSchema)