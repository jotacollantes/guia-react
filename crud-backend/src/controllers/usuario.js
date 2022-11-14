import { User } from "../models/Usuario.js";
import { request, response } from 'express'
import bcrypt from 'bcrypt'
import { generaToken } from "../helpers/generaToken.js";
import { respuestasJson } from "../helpers/respuestasJson.js";

const {mensajes} =respuestasJson

//creamos el objeto vacio
export const userCtrl = {};
//Añadimos un metodo al objeto
userCtrl.register = async (req = request, res = response) => {

    try {
        const data = req.body
        //console.log(data)
        //!Verificamos si el usuario no existe en BD.
        const usuarioExiste = await User.findOne({ correo: data.correo }).exec()
        //console.log(usuarioExiste)
        if (usuarioExiste) {
            

            return mensajes(res,400,false,"el correo ya existe")
        }
        //!Actualizo la propiedad password del objeto data con la clave encriptada
        data.password=await bcrypt.hash(data.password,10)

        //!Creamos el token

        //const usuarioNuevo = await User.create(data)
        const {nombre,correo,password,_id,createdAt,updatedAt} = await User.create(data)
       
        const token=generaToken({_id:_id})
        

       
        mensajes(res,200,true,"Usuario creado correctamente",{nombre,correo,_id,createdAt,updatedAt,token})
    }
    catch (error) {
       
        mensajes(res,500,false,error.message)
    }
}

userCtrl.login= async(req = request, res = response)=>{

    try {

        const data = req.body
        //console.log("datos: ",data)
        //!Verificamos si el usuario no existe en BD.
        const usuarioExiste = await User.findOne({ correo: data.correo}).exec()
        //console.log(usuarioExiste)
        if (!usuarioExiste) {
            // return res.status(400).json(
            //     {
            //         ok: false,
            //         message: "el correo no existe"
            //     }
            // )
            return mensajes(res,400,false,"el correo no existe")
        }
        //! Comparamos las claves enviada por el frontend con la recuperada en el User.findOne

        const {nombre,correo,password,_id}=usuarioExiste
        const match= await bcrypt.compare(data.password,password)
        
        if (!match){
            // return res.status(401).json(
            //     {
            //         ok: false,
            //         message: "contraseña incorrecta"
            //     }
            // )
            return mensajes(res,401,false,"contraseña incorrecta")
        }
        
        const token=generaToken({_id})
        // return res.status(200).json(
        //     {
        //         ok: true,
        //         message: "login exitoso",
        //         data : {nombre,correo,token}
        //     }
        // )
        return mensajes(res,200,true,"login exitoso",{nombre,correo,_id,token})

        

    } catch (error) {
        res.status(500).json({ ok: false, message: error.message})
    }

}