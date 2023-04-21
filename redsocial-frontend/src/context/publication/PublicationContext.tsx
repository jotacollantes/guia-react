import { createContext } from "react";
import { IPublication, PublicationsByUser } from "../../interfaces/publicationInterface";
import { PublicationActionType } from "./publicationReducer";


interface ContextProps {
  //publication: IPublication;
  page:number,
  pages:number,
  total:number
  publicationsByUser: PublicationsByUser[];
  getPublication: (userId: string, nextPage?: number, action?: string) => Promise<void>
  deletePublication: (userId: string, idPublication: string) => Promise<void>
  nextPage: (userId: string) => void
  dispatch: (value: PublicationActionType) => void
}

export const PublicationContext = createContext({} as ContextProps);
