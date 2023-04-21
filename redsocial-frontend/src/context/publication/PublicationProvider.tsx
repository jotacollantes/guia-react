import React, { useReducer } from "react";

import { PublicationContext, publicationReducer } from "./";
import { IPublication } from "../../interfaces/publicationInterface";
import { redSocialApi } from "../../api";
import { useAuth } from "../../hooks";
import { IPublicationFeed } from "../../interfaces/publicationFeedInterface";



interface Props {
  children: JSX.Element | JSX.Element[];
}

// export interface PublicationState{
//     publication:IPublication
// }

//Inicializamos
const PUBLICATION_INITIAL_STATE:IPublication = {
    // publication:  {
    //   status:             "",
    //   message:            "",
    //   page:               0,
    //   pages:              0,
    //   total:              0,
    //   publicationsByUser: []
    // }
   
      page:               0,
      pages:              0,
      total:              0,
      publicationsByUser: []
    
        
};

export const PublicationProvider = ({ children }: Props) => {
    const [state,dispatch]=useReducer(publicationReducer,PUBLICATION_INITIAL_STATE)
    const { auth } = useAuth();


const getPublication = async (userId:string,nextPage = 1,action='onStart') => {
  
  try {
    
    const { data } = await redSocialApi.get<IPublication>(
      `publication/advertiseuser/${userId}/${nextPage}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      }
    );
    
    let newPublicaciones=data.publicationsByUser
    
    //onStart quiere decir que esta cargando la pagina de perfil por primeza vez, y se comienza a paginar. Si es onRefresh, por cada post que se elimina se le cae encima al state con los datos iniciales de los post del usuario ya sin el post eliminado 
    if (action==='onStart' && state.publicationsByUser.length >= 1)
        {
         //console.log('tiene al menos una publicacion en el feed',state.publicationsByUser)
        newPublicaciones=[...state.publicationsByUser,...data.publicationsByUser]
        }
    


    const objPublicacion:IPublication ={
      page:               data.page,
      pages:              data.pages,
      total:              data.total,
      publicationsByUser: newPublicaciones
    }
    
    dispatch({ type: "PUBLICATION - getPublication", payload: objPublicacion });

  } catch (error) {
    //console.log(error);
    console.log('No hay publicaciones para este usuario')
  }
};





const deletePublication=async(userId:string,idPublication:string)=>{

    try {
      const {data} = await redSocialApi.delete(`publication/delete/${idPublication}`,{

          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          }
        })

          //Inicializamos el state con las publicaciones
          //dispatch({type: "PUBLICATION - deletePublication"})
          
          //Cargamos nuevamente el state con las publicaciones sin la publicacion que se elimino
          getPublication(userId,1,"onRefresh")
          //console.log(state)
    } catch (error) {
      console.log(error)
    }

  }
  const nextPage = (userId:string) => {
    //console.log('entro al nextpage')
    const next = state.page + 1;
    dispatch({type: "PUBLICATION - nextPage",payload:{page: next} })
    getPublication(userId,next,"onStart")
    //setPage(next);
    //fetchPublication(next);
  };




return (
    <PublicationContext.Provider value={{...state,getPublication,deletePublication,nextPage,dispatch }}>
      {children}
    </PublicationContext.Provider>
  );
};