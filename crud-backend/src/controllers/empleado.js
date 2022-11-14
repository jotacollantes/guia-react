import { Empleado } from "../models/Empleado.js"
import { respuestasJson } from "../helpers/respuestasJson.js";
import { request, response } from 'express'

const { mensajes } = respuestasJson


export const empleadoCtrl = {}

empleadoCtrl.listaTodosEmpleados = async (req = request, res = response) => {
    try {

        const empleados = await Empleado.find().populate({ path: "usuario", select: "-password" }).exec()
        console.log(empleados)
        if (empleados) {


            return mensajes(res, 200, true, "Lista de empleados", empleados)
        }

        mensajes(res, 200, false, "No hay empleados")
    } catch (error) {
        mensajes(res, 500, false, error.message)
    }
}

empleadoCtrl.crearEmpleado = async (req = request, res = response) => {

    try {
        const data = req.body
        console.log({...data,usuario:req.userid})
        //const empleadoNuevo = await Empleado.create(data)
        const empleadoNuevo = await Empleado.create({...data,usuario:req.userid})
        return mensajes(res, 201, true, "Empleado creado", empleadoNuevo)

    } catch (error) {
        mensajes(res, 500, false, error.message)
    }

}

empleadoCtrl.listEmpleadoByid = async (req = request, res = response) => {

    try {

        const { id } = req.params
        const empleado = await Empleado.findById(id).exec()
        if (!empleado) {
            return mensajes(res, 400, false, "Empleado no encontrado ")
        }



        mensajes(res, 200, true, "Empleado encontrado", empleado)

    } catch (error) {
        mensajes(res, 500, false, error.message)
    }
}

empleadoCtrl.listEmpleadosByJefe = async (req = request, res = response)=>{
    
    try {
        //!Id Del jefe
        //const { id } = req.params 
        const empleados = await Empleado.find({usuario:req.userid}).populate({ path: "usuario", select: "-password" }).exec()
        if (!empleados) {
            return mensajes(res, 400, false, "Empleados no encontrado ")
        }
        mensajes(res, 200, true, "Empleados encontrados", empleados)

    } catch (error) {
        mensajes(res, 500, false, error.message)
    }

}


empleadoCtrl.deleteEmpleado = async (req = request, res = response)=>{
    
    try {
        
        const { id } = req.params //!Id del empleado
        //!Primero verificamos que el empleado exista
        let empleado = await Empleado.findById(id).exec()
        if (!empleado) {
            return mensajes(res, 404, false, "Empleado no encontrado ")
        }

        //empleado = await Empleado.findByIdAndDelete(id).exec()
        //!Una vez verificado la existencia del empleado puedo usar un metodo del modelo empleado deleteOne():
        await empleado.deleteOne();
      


        mensajes(res, 200, true, "Empleado eliminado", empleado)

    } catch (error) {
        mensajes(res, 500, false, error.message)
    }

}


empleadoCtrl.updateEmpleado = async (req = request, res = response)=>{
    
    try {
        
        const { id } = req.params //!Id del empleado
        //!Primero verificamos que el usuario exista
        let empleado = await Empleado.findById(id).exec()
        if (!empleado) {
            return mensajes(res, 404, false, "Empleado no encontrado ")
        }

        //empleado = await Empleado.findByIdAndDelete(id).exec()
        //!Una vez verificado la existencia del empleado puedo usar un metodo del modelo empleado:
        await empleado.updateOne(req.body,{ new: true });
        //await Empleado.findByIdAndUpdate(id,req.body,{ new: true })
      


        mensajes(res, 200, true, "Empleado actualizado", empleado)

    } catch (error) {
        mensajes(res, 500, false, error.message)
    }

}


empleadoCtrl.searchEmpleado = async (req = request, res = response)=>{
    
    try {
        
        const { nombres } = req.params //!Id del empleado
        console.log(req.params)
        //!Primero verificamos que el usuario exista
        let empleados = await Empleado.find({
            nombres: {$regex: ".*"+nombres+".*"},
            usuario: req.userid //!Id del jefe tomado del token y almacenado en el req.userid
        }).exec()
           console.log("empleados: ",empleados)
           console.log(empleados.length)
        if (!empleados||empleados.length==0) {
            return mensajes(res, 404, false, "Empleados no encontrado ")
        }

        mensajes(res, 200, true, "Empleados encontrados", empleados)

    } catch (error) {
        mensajes(res, 500, false, error.message)
    }

}