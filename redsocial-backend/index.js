import {conection} from './database/conection.js'
import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import cors from 'cors'

import {followRouter,userRouter,publicationRouter} from './routes/index.js'
//import {router as userRouter}  from './routes/user.js'

//Conexion a base de datos
conection.start()

//Crear servidor de node
const app = express()
const port=3900

// configurar cors
//Middlewares siempre se ejecutan antes de las rutas o controladores 
app.use(cors())


//!Recibir datos con content-type app/json
app.use(express.json())
//!Recibir datos en x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

//!Cargamos las  rutas en express, especificamos el prefijo
app.use('/api/user',userRouter.router)
app.use('/api/publication',publicationRouter.router)
app.use('/api/follow',followRouter.router)


//Ejecutar servidor
app.listen(port,()=>{
    const date1 = new Date().getTime()
    console.log(`Servidor corriendo en el ${port} ${date1}`)
})

