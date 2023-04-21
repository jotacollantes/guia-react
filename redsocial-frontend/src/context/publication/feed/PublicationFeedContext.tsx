import { createContext } from "react";
import { FeedActionType } from "./publicationFeedReducer";
import { Publication } from "../../../interfaces/publicationFeedInterface";

interface FeedContextProps {
  page: number;
  pages: number;
  totalPublications: number;
  following: string[];
  publications: Publication[];
  getPublicationFeed: (nextPage?: number) => Promise<void>;
  nextPage: () => void;
  dispatch: (value: FeedActionType) => void;
}

export const PublicationFeedContext = createContext({} as FeedContextProps);
