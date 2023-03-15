import express from 'express'
import multer from 'multer'
import {userCtrl} from '../controllers/user.js'
import {verifyToken} from '../middlewares/auth.js'


//Configuracion de subida
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/avatars/')
    },
    filename:(req,file,cb)=>{
        cb(null,`avatar-${Date.now()}-${file.originalname}`)
    }
})
const upload =multer({storage})

export const router = express.Router()

router.get('/prueba-usuario',verifyToken,userCtrl.Prueba)
router.post('/register',userCtrl.Registro)
router.post('/login',userCtrl.Login)
router.get('/profile/:id',verifyToken,userCtrl.Profile)
//Parametro page es opcional con ?
router.get('/list/:page?',verifyToken,userCtrl.List)
router.put('/update',verifyToken,userCtrl.Update)
//Cuando son varios middlewares tienen que ir dentro de un array
router.post('/upload',[verifyToken,upload.single('file0')],userCtrl.Upload)

//router.get('/avatar/:file',verifyToken,userCtrl.Avatar)
router.get('/avatar/:file',userCtrl.Avatar)
router.get('/counter/:id',verifyToken,userCtrl.Counter)
