import { Router } from "express";
import { userCtrl } from "../controllers/usuario.js";



export const usuarioRouter=Router()

usuarioRouter.post('/register',userCtrl.register)
usuarioRouter.post('/login',userCtrl.login)
