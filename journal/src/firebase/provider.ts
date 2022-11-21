import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

//!se crea el googleAuthProvider
const googleProvider=new GoogleAuthProvider()

export const singInWithGoogle= async()=>{
    try {
        const result = await signInWithPopup(FirebaseAuth,googleProvider)
        //const credentials=GoogleAuthProvider.credentialFromResult(result)
        //console.log({credentials})
        const user=result.user;
        //console.log(user)
        const {displayName,email,photoURL,uid}=user
        return {
            ok:true,
            displayName,
            email,
            photoURL,
            uid
        }


    } catch (error:any) {
        //console.log(error)
        const errorCode=error.code;
        const errorMessage=error.message;
        return {
            ok:false,
            errorCode,
            errorMessage
        }
    }

}

export type NewUser={
    email:string,
    password:string,
    displayName:string
}
export const registerUserWithEmailPassword= async({email,password,displayName}:NewUser)=>{
    try {
        //!createUserWithEmailAndPassword es una funcion de firebase
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password)
        const {uid,photoURL}=resp.user
       await updateProfile(resp.user,{displayName})
        //console.log("provider",uid)
        return {
             ok:true,
             uid,
             photoURL,
             email,
             displayName
            }


    } catch (error:any) {
        //console.log(error)
        const errorCode=error.code;
        const errorMessage=error.message;
        return {
            ok:false,
            errorCode,
            errorMessage
        }
    }

}