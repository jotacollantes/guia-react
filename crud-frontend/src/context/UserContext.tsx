import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../helpers/Alert";

import { ApiCall } from "../helpers/ApiCall";
import { Empleado, Respuesta } from "../interfaces/interfaces";

type Login = {
  correo: string;
  password: string;
};

type User = {
  correo: string;
  nombre: string;
  password: string;
};

type EmpleadoNuevo = {
  //!No se incluye el _id porque es el type para el registro de empleado y mongo crea el _id
  nombres: string;
  apellidos: string;
  id: string;
  tcontrato: string;
};

//!Defino el type TodoContextProps que es la firma o la apariencia que ha a tener el contexto. Se van a ir añadiendo mas elementos
type ContextType = {
  loginUser: (credentials: Login) => Promise<void>;
  user: {
    login: boolean;
    token: string;
    name: string;
  };
  registerUser: (fields: User) => Promise<void>;
  registerEmpleado: (fields: EmpleadoNuevo) => Promise<void>;
  logout: () => void;
  empleado: Empleado;
  //!setEmpleado es el metodo par actualizar el state empleado, usado para las actualizaciones de datos por eso incluye el _id
  setEmpleado: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      nombres: string;
      apellidos: string;
      id: string;
      tcontrato: string;
    }>
  >;
  updateEmpleado: (fields: Empleado) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Props {
  //! la prop children va a recibir JSX Elements o una lista de JSX Elements[]
  children: JSX.Element | JSX.Element[];
}

//!Creamos el Contexto y lo exportamos
//!La variable UserContext va a servir para crear el  Provider para compartir la informacion de estados, metodos, etc. entre los componentes hijos
//! con <ContextType></ContextType> especifico que es una funcion generica y que el tipo de dato que se devuelve es del mismo tipo que se recibe
//export const TodoContext=createContext<TodoContextProps>({} as TodoContextProps)
export const UserContext = createContext<ContextType>({} as ContextType);

//!InitialStae para el Usario que va a iniciar Login
const initialState = {
  login: false,
  token: "",
  name: "",
};

//!initialState que va contener la informacion del registro empleado usado en el estado empleado usado para eactualizaciones
const initialStateEmpleado = {
  _id: "",
  nombres: "",
  apellidos: "",
  id: "",
  tcontrato: "fijo",
};

//!se que el provider del contexto User Context
export const UserProvider = ({ children }: Props) => {
  //!Este es el state que se va a compartir en toda la aplicacion por medio del provider
  const [user, setUser] = useState(initialState);

  const [empleado, setEmpleado] = useState(initialStateEmpleado);
  const [loading, setLoading] = useState(false);

  //!Leemos los datos del usuario desde el localstorage para hacer persistente la sesion
  useEffect(() => {
    //!En typescript hay que hacer doble lectura del LS, una para validar sin el parse y la otra que en caso de que exista info en el LS usando el parse
    let initial: any = localStorage.getItem("user") || "";

    if (!initial) {
      //console.log("poraqui")
      //console.log(initialState)
      setUser(initialState);
    } else {
      initial = JSON.parse(localStorage.getItem("user") || "");
      //console.log("poraca")
      //console.log(initial)
      setUser(initial);
    }
  }, []);

  const navigate = useNavigate();

  const loginUser = async (credentials: Login) => {
    setLoading(true);
    setTimeout(async() => {
      try {
      
       const { data } = await ApiCall("login", "POST", credentials);
      //console.log("LoginUser: ", data);
      if (data.ok) {
        const userLogin = {
          login: true,
          token: data.data.token,
          name: data.data.nombre,
        };
        //Grabar en el LS
        localStorage.setItem("user", JSON.stringify(userLogin));
        setUser(userLogin);
        Alert(true, data.mensaje);
        setLoading(false);
        navigate("/empleados");
      }
    } catch (error: Respuesta | any) {
      console.log("entro");
      if (!error.response.data.ok) {
        setLoading(false);
        return Alert(false, error.response.data.mensaje);
      }
      setLoading(false);
      console.log(`Error en el front end: ${error.response.data.mensaje}`);
    }
    }, 4000);
    
  };

  const registerUser = async (fields: User) => {
    try {
      const { data } = await ApiCall("register", "POST", fields);
      console.log("registerUser: ", data);
      if (data.ok) {
        const userCreate = {
          login: true,
          token: data.data.token,
          name: data.data.nombre,
        };
        //Grabar en el LS
        localStorage.setItem("user", JSON.stringify(userCreate));
        setUser(userCreate);
        navigate("/empleados");

        Alert(true, data.mensaje);
      }
    } catch (error: Respuesta | any) {
      if (!error.response.data.ok) {
        return Alert(false, error.response.data.mensaje);
      }
      console.log(`Error en el front end: ${error.response.data.mensaje}`);
    }
  };

  const registerEmpleado = async (fields: EmpleadoNuevo) => {
    try {
      //console.log("entro")
      //console.log(user.token)
      //console.log(fields)

      const { data } = await ApiCall("empleado", "POST", fields, user.token);

      if (data.ok) {
        Alert(true, data.mensaje);
        //navigate("/empleados");
      }
    } catch (error: Respuesta | any) {
      if (!error.response.data.ok) {
        return Alert(false, error.response.data.mensaje);
      }
      console.log(`Error en el front end: ${error.response.data.mensaje}`);
    }
  };

  const updateEmpleado = async (fields: Empleado) => {
    const { _id, ...rest } = fields;
    console.log(_id, rest);
    try {
      const { data } = await ApiCall(
        `empleado/update/${_id}`,
        "PUT",
        rest,
        user.token
      );

      if (data.ok) {
        Alert(true, data.mensaje);
        //navigate("/empleados");
      }
    } catch (error: Respuesta | any) {
      if (!error.response.data.ok) {
        return Alert(false, error.response.data.mensaje);
      }
      console.log(`Error en el front end: ${error.response.data.mensaje}`);
    }
  };

  const logout = () => {
    setUser(initialState);
    localStorage.removeItem("user");
  };

  //!En enste objeto ire ingresando como propiedades, las funciones que estemos creand

  const metodos = {
    loginUser,
    registerUser,
    user,
    logout,
    registerEmpleado,
    empleado,
    setEmpleado,
    updateEmpleado,
    loading,
    setLoading,
  };

  return (
    //! UserCOntext es un Higher order components por eso recibe un children desde las props
    // <UserContext.Provider value={metodos} {...props} >
    <UserContext.Provider value={metodos}>
      {/* Aqui se van a renderizar los componentes hijos */}
      {children}
    </UserContext.Provider>
  );
};

// //!Creo el custom Hook useUser que es el que se usara en todo el front end
// export const useUser=()=>{
//   //!Uso el contexto UserContext
//   const context=useContext(UserContext)
//   if(!context){
//     throw new Error('useUser error')
//   }
//   return context
// }
