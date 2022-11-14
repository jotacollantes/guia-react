const Articulo = require("../modelos/Articulo")
//*Para tener el intelligence volvemos a importar EXPRESS
const { request, response } = require('express')
const { validarDatos } = require('../helpers/validarDatos')
const path=require('path')
const fs = require('fs')

const crear = (req = request, res = response) => {

    //!Recoger todos los parametros que vienen por post
    //console.log(req.body)

    const params = req.body //para efectos de asignar al modelo y grabar en la Base de datos


    //!Validar Datos
    //  try {

    //      validarDatos(params)
    //   } catch (error) {

    //      return res.status(400).json({
    //          status:"error",
    //          mensaje: "Faltan datos"
    //      })
    //  }

    //!Crear el objeto a guardar
    //!Cuando se graba un registro es necesario crear una instancia del objeto
    const articulo = new Articulo(params)

    //Asignar valores a objeto basado en el modelo de forma manual
    // articulo.titulo=titulo;
    // articulo.contenido=contenido;

    //!Guardar el articulo en la base de datos.
    articulo.save((error, articuloGuardado) => {
        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: `Error al grabar en BD ${error}`
            })
        }

        //Devolver Resultado.
        //console.log(articuloGuardado)
        return res.status(200).json({
            status: "success",
            articuloGuardado
        })

    })
}

const listar = (req = request, res = response) => {
    //!Cuando se consultan datos no es necesario crear una instancia del objeto
    let consulta = Articulo.find({}, (error, articulos) => {

        if (error || !articulos) {
            return res.status(400).json({
                status: "error",
                mensaje: `No se han encontrado articulos ${error}`
            })
        }

        //Devolver Resultado.
        return res.status(200).json({
            contador: articulos.length,
            //parametro: req.params.ultimos,
            status: "success",
            articulos
        })


    })

    //!Mongoose me permite añadir propiedades o metodos a la instancia del objeto
    consulta.sort({ fecha: -1 })
    if (req.params.ultimos) {
        consulta.limit(3)
    }
}

const listarArticulo = (req = request, res = response) => {
    //Recoger un id por la url
    console.log(req.params.id)
    const id = req.params.id

    //  if (!id)
    //  {
    //     return res.status(400).json({
    //         status:"error",
    //         mensaje:"No se ha proporcionado el id"

    //     })
    //  }

    //Buscar el articulo
    //!Cuando se consultan datos no es necesario crear una instancia del objeto

    let consulta = Articulo.findById(id, (error, articulo) => {
        //console.log(error,articulo)
        if (error || !articulo) {
            return res.status(400).json({
                status: "error",
                mensaje: `No se han encontrado el articulo ${id}`
            })
        }
        return res.status(200).json({
            status: "success",
            articulo
        })


    })

}
const borrarArticulo = (req = request, res = response) => {

    const id = req.params.id

    Articulo.findByIdAndDelete(id, (error, articulo) => {
        //console.log("error",error)
        if (error || !articulo) {
            return res.status(500).json({
                status: "error",
                mensaje: `No se pudo eliminar el articulo ${id}`,
                error
            })
        }

        return res.status(200).json({
            status: "success",
            articulo,
        })
    })

}

const editar = (req = request, res = response) => {
    const id = req.params.id
    const params = req.body
    Articulo.findByIdAndUpdate(id, params, { new: true }, (error, articulo) => {
        if (error || !articulo) {
            return res.status(500).json({
                status: "error",
                mensaje: `No se pudo actualizar el articulo ${id}`,
                error
            })
        }

        return res.status(200).json({
            status: "success",
            articulo,
        })

    })

}
const upload = (req = request, res = response) => {

    //console.log(req.file)

    if (!req.file) {
        return res.status(400).json({
            status: "error",
            mensaje: `Peticion invalida`
        })
    }


    let fileName = req.file.originalname;
    let fileNameExtention = fileName.split(".")
    //console.log(fileNameExtention,fileNameExtention.length)
    let extention = fileNameExtention[fileNameExtention.length - 1].toLowerCase();
    //Comprobar extension Correcta

    //!En el middelware se hace la carga del archivo.
    //! Aqui en el controlador se valida el archivo subido
    //! Sino cumple con condiciones aqui en el controlador se lo borra
    if (extention != "png" && extention != "jpg" && extention != "jpeg" && extention != "gif") {
        //console.log("entro ", req.file.path)
        //!"path": "images/articulos/articulo1667412548807screen0.png",
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: `Extension de archivo ${extention} invalida`
            })

        })
    }
    else {


        const id = req.params.id

        Articulo.findByIdAndUpdate(id, { imagen: req.file.filename }, { new: true }, (error, articulo) => {
            if (error || !articulo) {
                return res.status(500).json({
                    status: "error",
                    mensaje: `No se pudo actualizar el articulo ${id}`,
                    error
                })
            }

            return res.status(200).json({
                status: "success",
                articulo,
                fichero: req.file.filename,
                extention
            })

        })
    }

    //Si todo es correcto, actualizar el articulo
}

const imagen=(req = request, res = response)=>{

    let file=req.params.fichero;
    let pathFile=`./images/articulos/${file}`
    //console.log(pathFile)
    fs.stat(pathFile,(error,exist)=>{
        if(exist)
        {
           return res.sendFile(path.resolve(pathFile))     
        }
        else
        {
            return res.status(400).json({
                status: "error",
                mensaje:"La imagen no existe",
                error
            })
        }
    })
}


const buscador =(req = request, res = response)=>{
    //Sacar el string de busqueda
    const busqueda=req.params.busqueda
    //Find Or
    Articulo.find({"$or":[
        //!si busqueda o contenifo INCLUYEN lo que viene en el parametro busqueda, se mostrara la informacion de manera descendente
        {"titulo":{"$regex":busqueda,"$options":"i"}},
        {"contenido":{"$regex":busqueda,"$options":"i"}}
    ]}).sort({fecha:-1}).exec((error,articulosEncontrados)=>{
        //!para que siempre muestre el error 404 tambien hay que evaluar la longitud del arrelgo
        if(error || !articulosEncontrados || articulosEncontrados.length<=0)
        {
            return res.status(200).json({
                status: "error",
                mensaje:"No se han encontrado articulos"
                
            })
        }

        return res.status(200).json({
            status: "success",
            articulosEncontrados

        })
    })

    //Ejecutar consulta

    //Devolver Resultado

}

module.exports = {

    crear,
    listar,
    listarArticulo,
    borrarArticulo,
    editar,
    upload,
    imagen,
    buscador
}