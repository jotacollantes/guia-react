import { Schema, model } from 'mongoose'

const PublicationSchema = Schema(
    {
        user: {
            //!Hacemos la referencia a la entidad User
            type: Schema.ObjectId,
            ref: "User"
        },
        text: {
            type: String,
            required: true
        },

        file: {
            type: String,
            required: false
        },

        created_at: {
            type: Date,
            default: Date.now()
        }


    }
)
//*Mongoose graba por defecto la coleccion como "publications" pero la defino explicitamente
export const Publication = model("Publication", PublicationSchema, "publications")