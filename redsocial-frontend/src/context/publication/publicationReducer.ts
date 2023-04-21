// import { PublicationState } from "./PublicationProvider";
import {
  IPublication,
  PublicationsByUser,
} from "../../interfaces/publicationInterface";

export type PublicationActionType =
  | {
      type: "PUBLICATION - getPublication";
      payload: IPublication;
    }
  |{
    type: "PUBLICATION - deletePublication"
  }
  | {
      type: "PUBLICATION - nextPage";
      payload: { page: number };
    };

export const publicationReducer = (
  state: IPublication,
  action: PublicationActionType
) => {
  switch (action.type) {
    case "PUBLICATION - getPublication":
      return {
        ...state,
        page: action.payload.page,
        pages: action.payload.pages,
        total: action.payload.total,
        publicationsByUser: action.payload.publicationsByUser,
      };
    //break;
    case "PUBLICATION - deletePublication":
    return {
      ...state,
      page: 0,
      pages: 0,
      total: 0,
      publicationsByUser: []
    };
    //break;

    case "PUBLICATION - nextPage":
      return {
        ...state,
        page: action.payload.page,
      };
    //break;

    default:
      return state;
  }
};
