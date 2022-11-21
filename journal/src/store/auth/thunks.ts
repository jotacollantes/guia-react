import { NewUser, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/provider"
import { AppDispatch, RootState } from "../store"
import { checkingCredentials, login, logout} from "./authSlice"

export const checkingAuthentication =(email:string,password:string):any=>{
    
    return  async(dispatch:AppDispatch,getState:RootState)=>{
        
        dispatch(checkingCredentials())
    }
    
    
}
export const startGoogleSignIn =():any=>{
    
        return  async(dispatch:AppDispatch,getState:RootState)=>{
            
            dispatch(checkingCredentials())
            //!Ejecutamos la funcion singInWithGoogle() que esta creada en /firebase/provider
            const result=await singInWithGoogle()
            
             if (result.ok){
                const { displayName,email,photoURL,uid}=result
                const datosLogin={
                    status:'authenticated',
                    displayName,
                    email,
                    photoURL,
                    uid,
                    errorMessages:''

                }
                dispatch(login(datosLogin))
             }
             else
             {
                dispatch(logout(result.errorMessage))
             }
        }
    }


    export const startCreatingUserWithEmailPassword =({email,password,displayName}:NewUser):any=>{
    
        return  async(dispatch:AppDispatch,getState:RootState)=>{
            
            dispatch(checkingCredentials())
            //!Ejecutamos la funcion registerUserWithEmailPassworde() que esta creada en /firebase/provider
            const credentials={
                email,password,displayName
            }
            const result=await registerUserWithEmailPassword(credentials)
            console.log("thunk",result)
             if (result.ok){
                const { displayName,email,photoURL,uid}=result
                const datosLogin={
                    status:'authenticated',
                    displayName,
                    email,
                    photoURL,
                    uid,
                    errorMessages:''

                }
                dispatch(login(datosLogin))
             }
             else
             {
                //console.log("entra ",result.errorMessage)
                dispatch(logout(result.errorMessage))
             }
        }
    }