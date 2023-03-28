import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { redSocialApi } from "../api/redSocialApi";
import { User } from "../components/user/PeopleItem";
interface Props {
  children: JSX.Element | JSX.Element[];
}

type UserAuth = {
  id: string;
  isLogged: boolean;
  token:string
};

type UserProfile = {
  id: string;
  name: string;
  surname: string;
  nick: string;
  email:string;
  image: string;
  bio:string
};

type Counter = {
  following: number;
  followed: number;
  publication: number;
};

interface ContextProps {
  // auth: {

  //     name:string,
  //     surname:string,
  //     nick:string,
  //     email:string
  // };
  auth: UserAuth;
  setAuth: (value: React.SetStateAction<UserAuth>) => void;
  counter: Counter;
  loading: boolean;
  setLoading: (value: React.SetStateAction<boolean>) => void;
  profile: UserProfile;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  setProfile: (value: React.SetStateAction<{
    id: string;
    name: string;
    surname: string;
    nick: string;
    email: string;
    image: string;
    bio: string;
}>) => void;
listFollowing:string[];
setListFollowing: (value: React.SetStateAction<string[]>) => void;
followUser: (userId: string) => Promise<void>;
unFollowUser: (userId: string) => Promise<void>;
getCounters: (id: string, token: string) => Promise<void>

}

//Creo una instancia de Context
export const AuthContext = createContext({} as ContextProps);

const initialStateAuth = {
  id: "",
  // name: "",
  // nick: "",
  isLogged: false,
  token:''
};
const initialStateProfile = {
  id: "",
  name: "",
  surname: "",
  nick: "",
  email: "",
  image: "default.png",
  bio:''
};
const initialStateCounter = {
  following: 0,
  followed: 0,
  publication: 0,
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(initialStateAuth);
  const [counter, setCounter] = useState(initialStateCounter);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(initialStateProfile);
  const [listFollowing, setListFollowing] = useState<string[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    //Se ejecuta authUser() vez que se renderiza el authprovider
  //console.log('desde el provider')
    authUser();
  }, []);

  const authUser = async () => {
    try {
      //Sacar Datos de usuario identificado y del token del local storage
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      //COmprobar si tengo el token y el user
      if (!token || !user) {
        setLoading(false);
        return false;
      }

      //Transformar los datos a un objeto de javascript
      const userData: UserAuth = JSON.parse(user);
      await getProfile(userData.id!,token)
      await getCounters(userData.id!, token);
      setAuth({ id: userData.id, isLogged: true,token });
      setLoading(false);
    } catch (error) {
      console.log("authUser", error);
    }
  };

  const getProfile=async (idUser:string,token:string)=>{
    try {
      const { data } = await redSocialApi.get(`user/profile/${idUser}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (data.status !== "success") {
        return false;
      }
      const { _id: id, nick, name, surname, email, image,bio } = data.userProfile;
      //Setear el estado profile
      setProfile({ id, name, surname, nick, email, image,bio });
      
    } catch (error) {
      console.log(error)
      return false;
    }

  }

  const getCounters = async (id: string, token: string) => {
    try {
      const { data } = await redSocialApi.get(`user/counter/${id}`, {
        headers: {
          //"Content-Type": "application/json"
          Authorization: token,

        },
      })

      //console.log(id,token,data)
      const { following, followed, publication } = data;
      //Setear el estado Counter
      setCounter({ following, followed, publication });
    } catch (error) {
      console.log("authCounters:", error);
    }
  };


  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      
      const { data } = await redSocialApi.post(`/user/login`, { email, password },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      

      if (data.status==='success'){
        //Grabar en el localstorage
        localStorage.setItem('token',data.token)
        localStorage.setItem('user',JSON.stringify(data.user))
        //Cargar el state del profile
        await getProfile(data.user.id!,data.token)
        //Cargar el state de counter
        await getCounters(data.user.id!, data.token);
        //Cargar el state de auth
        setAuth({id:data.user.id,isLogged:true,token:data.token})
        
        //Redireccionar al usuario a la seccion privada en este caso a /social/feed 
        navigate("/social/feed");
        return true;
      } else{
        return false;
      }
      

      //*Los errores 400 entran por el catch
    } catch (error) {
      console.log(error)
      return false;
    }
  };
   const logoutUser=()=>{
    localStorage.clear()
    setAuth(initialStateAuth)
    setProfile(initialStateProfile)
    setCounter(initialStateCounter)
    navigate("/login")
   }
  //console.log(auth);
  //console.log('counter',counter)
  //console.log(profile);


  const followUser=async(userId:string)=>{
    //Peticion al backend para seguir
    //console.log('Provider follower: ',userId)
    try {
      const {data}=await redSocialApi.post(`follow/save`, JSON.stringify({ followed:userId}),{
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    })
    //console.log(data)
    setListFollowing([...listFollowing,userId])
    //Para actualizar el state de counters
    //console.log(auth.id,auth.token)
    await getCounters(auth.id,auth.token)
   
    } catch (error) {
      console.log(error)
    }
    
}

  const unFollowUser=async(userId:string)=>{
    //Peticion al backend para seguir
    console.log('Provider unFollower: ',userId)
    try {
      const {data}=await redSocialApi.delete(`follow/unfollow/${userId}`,{
      headers: {
        //"Content-Type": "application/json",
        Authorization: auth.token,
      },
    })
    //console.log(data)

    let newListFollowing
    newListFollowing=listFollowing.filter((following)=>{
      return following !==userId
    })
    
    setListFollowing(newListFollowing)
    await getCounters(auth.id,auth.token)
    console.log(listFollowing)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    //en la prop value indico lo que voy compartir en el contexto:
    //- el state auth
    //- el state counter
    //- el state loading y su metodo setLoading

    <AuthContext.Provider
      value={{ auth, counter, loading, setLoading, setAuth, profile,loginUser,logoutUser,setProfile,listFollowing,setListFollowing,followUser,unFollowUser,getCounters}}
    >
      {children}
    </AuthContext.Provider>
  );
};
