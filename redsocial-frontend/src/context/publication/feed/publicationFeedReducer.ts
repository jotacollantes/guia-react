// import { PublicationState } from "./PublicationProvider";
import { IPublicationFeed } from "../../../interfaces/publicationFeedInterface";

export type FeedActionType =
  | {
      type: "PUBLICATION FEED - getPublication";
      payload: IPublicationFeed;
    }
    | {
      type: "PUBLICATION FEED - deletePublication";
      
    }

  | {
      type: "PUBLICATION FEED - nextPage";
      payload: { page: number };
    };

export const publicationFeedReducer = (
  state: IPublicationFeed,
  action: FeedActionType
) => {
  //console.log("entro al reducer");
  switch (action.type) {
    case "PUBLICATION FEED - getPublication":
      return {
        ...state,
        page: action.payload.page,
        pages: action.payload.pages,
        totalPublications: action.payload.totalPublications,
        following: action.payload.following,
        publications: action.payload.publications,
      };
    //break;

    case "PUBLICATION FEED - deletePublication":
      return {
        ...state,
        page: 0,
        pages: 0,
        totalPublications: 0,
        following: [],
        publications: [],
      };
    //break;

    case "PUBLICATION FEED - nextPage":
      return {
        ...state,
        page: action.payload.page,
      };
    //break;

    default:
      return state;
  }
};
