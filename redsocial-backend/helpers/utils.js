
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
export const utils={}


//*verificar usuarios duplicados usando el Modelo User que ya tiene una abstraccion de la coleccion de usuarios. find() puede usar filtros
utils.UsuarioExiste=async(email,nick)=>{
    const userExist = await User.find({
        $or: [
            //SI existe el email O si existe el nick
            { email: email.toLowerCase() },
            { nick: nick.toLowerCase() }
        ]
    }).count()
    //.exec((error,users)=>{})
    //console.log({userExist})
    if (userExist > 0) {
        return true

    }
    return false
}

utils.Hash=async(password)=>{
  // Cifrar contraseña
  const hash = await bcrypt.hash(password, 10)
  //console.log(hash)
  return hash
}



utils.CorreoExiste=async(email)=>{
    const correoExiste = await User.find({email: email.toLowerCase()}).count()
    
    if (correoExiste > 0) {
        return true

    }
    return false
}

utils.NickExiste=async(nick)=>{
    const nickExiste = await User.find({nick: nick.toLowerCase()}).count()
    //.exec((error,users)=>{})
    //console.log({userExist})
    if (nickExiste > 0) {
        return true

    }
    return false
}