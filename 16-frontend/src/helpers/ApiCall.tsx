import axios from "axios";
import { Respuesta } from "../intrfaces/interfaces";
import { Url } from "./Url";

export const ApiCall = async (
  endPoint: string,
  method = "GET",
  payload:any="",
  isFile=false
) => {
  let data = {} as Respuesta;
  //let data = {} as any;

  try {
    switch (method) {
      case "GET":
        //console.log(`${Url}${endPoint}`)
        data = await axios.get(`${Url}${endPoint}`);
        break;
      case "PUT":
        data = await axios.put(`${Url}${endPoint}`,payload);
        break;  
      case "POST":
        if(isFile){
          data = await axios.post(`${Url}${endPoint}`,payload,{
            headers:{'Content-Type': 'multipart/form-data'}
          });
        }
        else
        {
          data = await axios.post(`${Url}${endPoint}`,payload);
        }
        break;
      case "DELETE":
        data = await axios.delete(`${Url}${endPoint}`);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};
