import {Schema,model} from 'mongoose'

const UserSchema=Schema({
    name:{
        type: String,
        required:true
    },
    surname:{
        type: String
    },
    bio:{
        type: String,
        required:false
    },
    nick:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },


    role:{
        type: String,
        default:"role_user"
    },
    image:{
        type: String,
        default:"default.png"
    },
    create_at:{
        type: Date,
        default:Date.now()
    }

})

//*Mongoose graba por defecto la coleccion como "users" pero la defino explicitamente
export const User= model("User",UserSchema,"users")