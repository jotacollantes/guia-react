import {request,response} from 'express'
import {Follow,User} from '../models/index.js'
import mongoosePagination from 'mongoose-pagination'
import {followUserIds,followThisUser} from '../helpers/followServices.js'
export const followCtrl={}

followCtrl.Prueba =(req=request,res=response)=>{
    
    return res.status(200).json({
        message:"enviado desde el controlador follow"
    })
}

//Guardar un follow

followCtrl.SaveFollow=async(req=request,res=response)=>{

    try {
        const followedId=req.body.followed
    //Conseguir datos por Body

    //Sacar ID del usuario identificado
    const currentUserId=req.user.id

    //Crear objeto con modelo follow
    const userToFollow=new Follow({user:currentUserId,followed:followedId})
    //*Configuro el id del usuario actual conectado(token)
    //userToFollow.user=currentUserId
    //*Configuro el id del usuario al que se quiere seguir
    //userToFollow.followed=followedId

    //Guardar objeto en bd
    await userToFollow.save()
    return res.status(200).json({
        status:"succes",
        user:req.user,
        followed: userToFollow
    })
    } catch (error) {
        return res.status(500).json({
            status:"error",
            message:"Error al grabar el followed"
        })
    }
    
}

//Unfollow

followCtrl.Unfollow =async(req=request,res=response)=>{
    try {
        //recoger el id del usuario conectado
    const currentId=req.user.id
    //recoger el id del usuario que voy hacer unfollow
    const unfollowdId=req.params.id


    
    const followDeleted=await Follow.findOneAndDelete({'user':currentId,'followed':unfollowdId})
    console.log(followDeleted)
    if(!followDeleted){
        return res.status(401).json({
            status:"error",
            message:"usuario no pudo ser eliminado o no existe"
        })
    }
    

    
    return res.status(200).json({
        status:"success",
        message:"Follow ha sido eliminado",
        //followDeleted
    })
    } catch (error) {
        return res.status(500).json({
            status:"error",
            message:"Error al borrar el followed"
        })
    }
    
}

//Listado de Usuarios seguidos de un usuario x (siguiendo)

followCtrl.Following =async(req=request,res=response)=>{
try {
    //Sacar del id del usario que esta conectado
    let userId=req.user.id

    //*COmprobar si llega el id por parametro, si llega reemplazo el user Id
    if(req.params.id) userId=req.params.id

    //COmprobar si llega la pagina caso contrario se establece el default en 1
    let page=1

    if(req.params.page) page=req.params.page

    //Usuarios por pagina que quiero mostrar

    const itemsPerPage=5

    //Find a modelo Follow, popular los datos de los usuarios que se esta siguiendo y paginar con mongoose paginate.

    const listaFollowing=await Follow.find({user:userId})
    //Hacemos el populate de los campos user y followed
    .populate('user followed','-password -role -__v -email')
    .paginate(page,itemsPerPage)

    if (!listaFollowing || listaFollowing.length === 0) {
        // Entra por array vacio
        //console.log({listUsers})
        return res.status(404).json({
            status: "error",
            messages: "No hay usuarios seguidos",
            //listaFollowing

        })
    }
    //Obtenemos el total de usariosseguidos
    const totalFollowing = await Follow.count({'user':userId})


    

    //Sacar un array de los ids de los usuarios que me siguen y los que sigo como usuario conectado

    let followUserIdsList=await followUserIds(userId) 
    
    return res.status(200).json({
        status:"success",
        message:"Listado de Usuarios que estoy siguiendo",
        listaFollowing,
        totalFollowing,
         //Ceil 3,2 redondea a su siguiente entero o sea 4
         pages: Math.ceil(totalFollowing / itemsPerPage),
         following:followUserIdsList.following,
         followme:followUserIdsList.followers

    })
} catch (error) {
    return res.status(500).json({
        status:"error",
        message:"Error al obtener los usuarios seguidos",
        
    })
}
    
}

//Listado de usuarios que siguen a cualquier otro usuario que se especifique en la url como param o que me siguen (usuario conectado)
followCtrl.Followers =async(req=request,res=response)=>{
    
    try {
        //Sacar del id del usario que esta conectado
        let userId=req.user.id
    
        //*COmprobar si llega el id por parametro, si llega reemplazo el user Id
        if(req.params.id) userId=req.params.id
    
        //COmprobar si llega la pagina caso contrario se establece el default en 1
        let page=1
    
        if(req.params.page) page=req.params.page
    
        //Usuarios por pagina que quiero mostrar
    
        const itemsPerPage=5
    
        //Find a modelo Follow, popular los datos de los usuarios que se esta siguiendo y paginar con mongoose paginate.
    
        const listaFollowers=await Follow.find({'followed':userId})
        //Hacemos el populate de los campos user y followed
        .populate('user','-password -role -__v -email')
        .paginate(page,itemsPerPage)
    
        if (!listaFollowers || listaFollowers.length === 0) {
            // Entra por array vacio
            //console.log({listUsers})
            return res.status(404).json({
                status: "error",
                messages: "No hay usuarios seguidores",
                //listaFollowing
    
            })
        }
        //Obtenemos el total de usarios seguidores
        const totalFollowers = await Follow.count({'followed':userId})
        
    
        //Sacar un array de los ids de los usuarios que me siguen y los que sigo como usuario conectado
    
        let followUserIdsList=await followUserIds(userId) 
        
        return res.status(200).json({
            status:"success",
            message:"Listado de Usuarios seguidores",
            listaFollowers,
            totalFollowers,
             //Ceil 3,2 redondea a su siguiente entero o sea 4
             pages: Math.ceil(totalFollowers / itemsPerPage),
             following:followUserIdsList.following,
             followme:followUserIdsList.followers
    
        })
    } catch (error) {
        return res.status(500).json({
            status:"error",
            message:"Error al obtener los usuarios seguidores",
            
        })
    }
}