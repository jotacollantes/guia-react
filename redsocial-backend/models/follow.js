
import {Schema,model} from 'mongoose'

const FollowSchema=Schema({
    user:{
        //!Hacemos la referencia a la entidad User
        type: Schema.ObjectId,
        ref:"User"
    },
    followed:{
        //!Hacemos la referencia a la entidad User
        type: Schema.ObjectId,
        ref:"User"
    },
    create_at:{
        type: Date,
        default:Date.now()
    }

})

//*Mongoose graba por defecto la coleccion como "follows" pero la defino explicitamente
export const Follow= model("Follow",FollowSchema,"follows")