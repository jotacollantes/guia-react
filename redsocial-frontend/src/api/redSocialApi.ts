import axios from 'axios'
//*Creo una instancia de axios
export const redSocialApi= axios.create({
    baseURL:'http://127.0.0.1:3900/api/'
})