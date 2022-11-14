import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },

        correo: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true
    }
)

export const User=model('usuario',userSchema)