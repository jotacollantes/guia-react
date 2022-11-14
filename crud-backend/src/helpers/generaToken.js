import jwt from "jsonwebtoken";

export const generaToken=(args)=>{
    //console.log(args)
    const token= jwt.sign(args,"secreta")
    return token
}