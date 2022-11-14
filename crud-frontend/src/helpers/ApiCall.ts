import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Respuesta } from "../interfaces/interfaces";
import { Url } from "./Url";

//! Esto sirve solamente dentro de un functional component que este cubierto por el context.provider
//* const {user}=useContext(UserContext)
//* axios.defaults.baseURL="http://localhost:4000/api/"
//* axios.defaults.headers.common['Authorization']=`Bearer ${user.token}`

export const ApiCall = async (
  endPoint: string,
  method = "GET",
  payload: any = "",
  token: boolean | string = false
) => {
  let data = {} as Respuesta;

  //let data = {} as any;

  try {
    switch (method) {
      case "GET":
        //console.log(`${Url}${endPoint}`)
        if (token) {
          data = await axios.get(`${Url}${endPoint}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          data = await axios.get(`${Url}${endPoint}`);
        }

        break;
      case "PUT":
      console.log("entro al put: ",payload)
        data = await axios.put(`${Url}${endPoint}`, payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        break;
      case "POST":
        
        if (token) {
          data = await axios.post(`${Url}${endPoint}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          data = await axios.post(`${Url}${endPoint}`, payload);
        }

        break;
      case "DELETE":
        // data = await axios.delete(`${Url}${endPoint}`);

        data = await axios.delete(`${Url}${endPoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        break;
      default:
        break;
    }
  } catch (error) {
    //console.log("error",error);
    throw error;
  }
  return data;
};
