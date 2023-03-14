import { Follow } from '../models/index.js'

export const followUserIds = async (identityUserId) => {

    try {
        //Usuarios que el usuario que esta conectado esta siguiendo
        const following = await Follow.find({ 'user': identityUserId })
            .select({ '_id': false, 'followed': true })

        const followers = await Follow.find({ 'followed': identityUserId })
            .select({ '_id': false, 'user': true })



        //*Procesamos los array de objetos para que sean array de strings para que sea mas limpio
        let followingClean = []

        for (const key of following) {
            followingClean.push(key.followed)
        }
        //console.log({followingClean})



        let followersClean = []

        for (const key of followers) {
            followersClean.push(key.user)
        }
        //console.log({followersClean})


        return {
            following: followingClean,
            followers: followersClean
        }
    } catch (error) {
        return {}
    }

}

export const followThisUser = async (identityUserId, profileUserId) => {
    try {
        const following = await Follow.findOne({'user':identityUserId,'followed':profileUserId})

    const follower = await Follow.findOne({'user':profileUserId,'followed':identityUserId})

    return {
        following,
        follower
    }
    } catch (error) {
        return {}
    }
    
}