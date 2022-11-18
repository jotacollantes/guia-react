import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import { request, response } from 'express'
import { conexionDB } from './src/database/database.js';
import { usuarioRouter } from './src/routes/usuarioRouter.js';
import { empleadoRouter } from './src/routes/empleadoRouter.js';


const app=express();

app.set("port",4000);

app.use(morgan('dev'))
//!Recibir datos con //form-urlencoded
app.use(express.urlencoded({extended:true}))
//!Recibir datos con content-type app/json
app.use(express.json());
app.use(cors({origin:"*"}))


// app.use('/',(req=request,res=response)=>{
//     res.status(200).json({
//         ok:true,
//         message:"hello world"
//     })
// })
//!Cargo las rutas a parti de la raiz /api
app.use("/api",usuarioRouter)
app.use("/api/empleado",empleadoRouter)

app.listen(app.get('port'),()=>
   {
    console.log('Servidor escuchando en el puerto', app.get('port'))
})

//COnexion de la base de datos:
conexionDB()