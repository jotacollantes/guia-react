const {conexion} = require("./basedatos/conexion")
const express=require("express")
const cors=require("cors")
//Inicializar app
console.log("app started")

//Conectar a bd
conexion()

//Crear servidor Node
const app=express();
const port=3900;

//Configurar cors
//Todos los origenes pueden entrar al endpoint
app.use(cors())

//Convertir body (que vienen en json al endpoint) a un objeto JS
//!Recibir datos con content-type app/json
app.use(express.json());
//!Recibir datos con //form-urlencoded
app.use(express.urlencoded({extended:true})); 

//Crear Rutas
const rutas_articulo=require("./rutas/articulo")

//!Cargo las rutas a parti de la raiz /api
app.use("/api",rutas_articulo)




        
//Crear servidor y escuchar peticiones HTTP
app.listen(port,()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})
