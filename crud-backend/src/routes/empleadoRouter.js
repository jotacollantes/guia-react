import { Router } from "express";
import { empleadoCtrl } from "../controllers/empleado.js";
import { verificarToken } from "../middlewares/auth.js";



export const empleadoRouter=Router()

empleadoRouter.get('/',empleadoCtrl.listaTodosEmpleados)

// empleadoRouter.post('/',verificarToken,empleadoCtrl.crearEmpleado)
// empleadoRouter.get('/listid/:id',empleadoCtrl.listEmpleadoByid)
// empleadoRouter.get('/listaempleados/:id',empleadoCtrl.listEmpleadosByJefe)
// empleadoRouter.delete('/delete/:id',empleadoCtrl.deleteEmpleado)
// empleadoRouter.put('/update/:id',empleadoCtrl.updateEmpleado)
// empleadoRouter.get('/search/:id/:nombres/',empleadoCtrl.searchEmpleado)

//!Proteger
empleadoRouter.post('/',verificarToken,empleadoCtrl.crearEmpleado)

empleadoRouter.get('/listid/:id',verificarToken,empleadoCtrl.listEmpleadoByid)
//!Proteger
empleadoRouter.get('/listaempleados/',verificarToken,empleadoCtrl.listEmpleadosByJefe)
empleadoRouter.delete('/delete/:id',verificarToken,empleadoCtrl.deleteEmpleado)
empleadoRouter.put('/update/:id',verificarToken,empleadoCtrl.updateEmpleado)
//!Proteger
empleadoRouter.get('/search/:nombres/',verificarToken,empleadoCtrl.searchEmpleado)