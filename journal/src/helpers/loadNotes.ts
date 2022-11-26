import { collection, doc, getDocs } from "firebase/firestore/lite";

import { FirebaseDB } from "../firebase/config";
import { Note } from "../store/journal/journalSlice";

type UID = string | null | undefined;
interface Doc {
  id:string,
  body?: string;
  date?: number;
  title?: string;
}

export const loadNotes = async (uid: UID) => {
  if (!uid) throw new Error("El uid no fue recibido");

  //! con collection() creo la referencia con el path hacia la coleccion userid/journal/notes
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  //!Como es un promesa uso el await y getDocs() me va a devolver los documentos dentro de la coleccion collectionRef enviado como parametro
  const docs = await getDocs(collectionRef);
  //! en docs tengo la referencia hacia los documentos. y tengo quer usar la funcion foreach integrada en docs proporcionada por firebase para leerlos

  const newNotes: Doc []=[];
  //const newNotes: Note []=[];
  docs.forEach((doc) => {
    // doc.data() devuelve un objeto de la siguiente manera:
    // {
    //   body: "";
    //   date: 1669266276430;
    //   title: "";
    // }
    // y es necesario incluir el uid
    newNotes.push({id: doc.id,...doc.data()})
  });
  //console.log(newNotes)
  return newNotes
};
