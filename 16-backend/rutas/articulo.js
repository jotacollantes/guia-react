const express =require("express");
const router=express.Router();
const {check}=require('express-validator')
const {fieldsValidators}=require('../middlewares/fieldsValidators')
const ArticuloController=require("../controladores/articulo")
const multer=require("multer");


//!Creamos el almacenamiento
const storage=multer.diskStorage(
    {
        //!Metodo donde se van a guardar los archivos
        destination:(req,file,cb)=>{
            cb(null,'./images/articulos/')
        },
        //!Para conseguir el nombre del archivo
        filename:(req,file,cb)=>{
            cb(null,"articulo"+Date.now()+file.originalname);
        }
    }
)
//!Le indicamos a multer cual sera el storage
const uploadFile=multer({storage})


router.post("/crear",check('titulo','El titulo es obligatorio').not().isEmpty(),check('contenido','El contenido es obligatorio').not().isEmpty(), fieldsValidators,ArticuloController.crear)
//! :ultimos? es un parametro opcional
router.get("/articulos/:ultimos?",ArticuloController.listar)

//! :id es un parametro obligatorio
router.get("/articulo/:id",ArticuloController.listarArticulo)

//! :id es un parametro obligatorio
router.delete("/articulo/:id",ArticuloController.borrarArticulo)

//! :id es un parametro obligatorio
router.put("/articulo/:id", check('titulo','El titulo es obligatorio').not().isEmpty(),check('contenido','El contenido es obligatorio').not().isEmpty(), fieldsValidators, ArticuloController.editar)

//! Solo se va a subir un solo archivo.
//! @param fieldName "file0" — nombre del campo en el multipart form a procesar
router.post("/upload/:id",[uploadFile.single("file0")],ArticuloController.upload)

router.get("/imagen/:fichero",ArticuloController.imagen)
router.get("/buscar/:busqueda",ArticuloController.buscador)

//Exporto la configuracion del router
module.exports=router;