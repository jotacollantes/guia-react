import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {  loadNotes } from "../../helpers";
import { AppDispatch, RootState } from "../store";
import { savingNewNote,addNewEmptyNote, Note, setActiveNote, setNotes} from "./";

type UID = string | null | undefined;


export const startNewNote = (uid: UID): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {

     //! actualizamos el isSaving a true para bloquear botones
     dispatch(savingNewNote())
    
    const newNote:Note= {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    //!Apuntamos al nodo de notas
    //!Dentro del documento buscamos la coleccion
    //!newDoc tiene el id del Documento generado
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    //!y añadimos las notas
    const docResp = await setDoc(newDoc, newNote);

    //!añadimos el id del documento al objeto newNote como una nueva propiedad
    newNote.id = newDoc.id;
    //console.log({newDoc,docResp})
    //!Hacemos el dispatch en addNewEmptyNote
    dispatch(addNewEmptyNote(newNote))
    //!Hacemos dispatch de setActiveNote
    dispatch(setActiveNote(newNote))
    
  };
};

export const startLoadingNotes = (uid: UID): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {

     
    console.log('thunk/startLoadingNotes: ',uid)
      //!Usamos helper loadNotes() que fue definido para separar codigo y no cargar mucho al thunk

      
    const notes:any=await loadNotes(uid)
    dispatch(setNotes(notes))
  

    };
};

export const setSelectedNote = (note:Note): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {

   console.log(note)
    //!Hacemos dispatch de setActiveNote
    dispatch(setActiveNote(note))
    
  };
};


