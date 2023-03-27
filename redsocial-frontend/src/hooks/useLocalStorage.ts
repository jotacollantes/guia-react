import { useState } from "react"
interface Respuesta{

}
export const useLocalStorage=(key:string,defaultValue:any):[string,(newValue:string)=>void]=>{
    const [storedValue, setStoredValue] = useState(
        ()=>{
            
        try {
            const value=localStorage.getItem(key)
            if(value)
            {
                return JSON.parse(value)
            }
            else
            {
                localStorage.setItem(key,JSON.stringify(defaultValue))
                return defaultValue;
            }

        } catch (error) {
            return defaultValue;
        }}
    )
   
    const setValue=(newValue:string) =>{
            try {
                localStorage.setItem(key,JSON.stringify(newValue))
            } catch (error) {
                console.log(error)
            }
            setStoredValue(newValue)
    }
    return[storedValue,setValue]
}

//Asi se llama a este hook
// const [userData,setUserData]=useLocalStorage('user',JSON.stringify(data.user))
// const [userToken,setUserToken]=useLocalStorage('token',data.token)