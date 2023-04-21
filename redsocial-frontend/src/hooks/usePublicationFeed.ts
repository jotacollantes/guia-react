import { useContext } from "react"
import { PublicationFeedContext } from "../context/publication/feed/PublicationFeedContext";

//Creamos este custom hook para poder usar el Publication Context
export const usePublicationFeed=()=>{
    return useContext(PublicationFeedContext)
}