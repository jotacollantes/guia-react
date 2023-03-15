import express from 'express'
import multer from 'multer'
import {publicationCtrl} from '../controllers/publication.js'
import {verifyToken} from '../middlewares/auth.js'
export const router = express.Router()



//Configuracion de subida
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/publications/')
    },
    filename:(req,file,cb)=>{
        cb(null,`pub-${Date.now()}-${file.originalname}`)
    }
})
const upload =multer({storage})

router.get('/prueba-publication',publicationCtrl.Prueba)
router.post('/save',verifyToken,publicationCtrl.Save)
router.get('/advertise/:id',verifyToken,publicationCtrl.Advertise)
router.delete('/delete/:id',verifyToken,publicationCtrl.Delete)
router.get('/advertiseuser/:id/:page?',verifyToken,publicationCtrl.AdvertiseUser)
//El id de la publicacion es obligatoria
router.post('/upload/:id',[verifyToken,upload.single('file0')],publicationCtrl.Upload)
