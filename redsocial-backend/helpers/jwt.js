import jwt from 'jwt-simple'
import moment from 'moment'



export const createJwt=(user)=>{
    const secret= process.env.JWT_SECRET_KEY
    //console.log({secret})
    const payload={
        id     :user._id,
        name   :user.name,
        surname:user.surname,
        nick   :user.nick,
        email  :user.email,
        role   :user.role,
        image :user.image,
        //Tiempo en que se creo el payload
        iat:moment().unix(),
        // fecha de expiracion del JWT, 30 dias a partir de este momento
        exp:moment().add(30,"days").unix() 
    }
    console.log({payload})
    return jwt.encode(payload,secret)
}