import React, { useReducer } from "react";
import { redSocialApi } from "../../../api";
import { useAuth } from "../../../hooks";
import { IPublicationFeed } from "../../../interfaces/publicationFeedInterface";
import { publicationFeedReducer } from "./publicationFeedReducer";
import { PublicationFeedContext } from "./PublicationFeedContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}

//Inicializamos
const PUBLICATION_FEED_INITIAL_STATE: IPublicationFeed = {
  page: 0,
  pages: 0,
  totalPublications: 0,
  following: [],
  publications: [],
};

export const PublicationFeedProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    publicationFeedReducer,
    PUBLICATION_FEED_INITIAL_STATE
  );
  const { auth } = useAuth();

  const getPublicationFeed = async (nextPage = 1) => {

    //console.log('entro al getPublicationFeed')
    try {
      const { data } = await redSocialApi.get<IPublicationFeed>(
        `publication/feed/${nextPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        }
      );
      
      let newPublicaciones = data.publications;

      const objPublicacion: IPublicationFeed = {
        page: data.page,
        pages: data.pages,
        totalPublications: data.totalPublications,
        following: data.following,
        publications: newPublicaciones,
      };
      //console.log({objPublicacion})
      dispatch({
        type: "PUBLICATION FEED - getPublication",
        payload: objPublicacion,
      });
    } catch (error) {
      //console.log(error);
      console.log("No hay publicaciones para este usuario");
    }
  };

  const nextPage = () => {
    //console.log('entro al nextpage')
    const next = state.page + 1;
    dispatch({ type: "PUBLICATION FEED - nextPage", payload: { page: next } });
    getPublicationFeed(next);
    //setPage(next);
    //fetchPublication(next);
  };

  return (
    <PublicationFeedContext.Provider
      value={{ ...state, getPublicationFeed, nextPage, dispatch }}
    >
      {children}
    </PublicationFeedContext.Provider>
  );
};
