import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { AppDispatch, RootState } from "../store";
import {
  savingNewNote,
  addNewEmptyNote,
  Note,
  setActiveNote,
  setNotes,
  setSaving,
  updateNotesSideBar,
  setPhotosToActiveNote,
  deleteNoteById,
} from "./";

type UID = string | null | undefined;

export const startNewNote = (uid: UID): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    //! actualizamos el isSaving a true para bloquear botones
    dispatch(savingNewNote());

    const newNote: Note = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
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
    dispatch(addNewEmptyNote(newNote));
    //!Hacemos dispatch de setActiveNote
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = (uid: UID): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    //console.log('thunk/startLoadingNotes: ',uid)
    //!Usamos helper loadNotes() que fue definido para separar codigo y no cargar mucho al thunk

    const notes: any = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setSelectedNote = (note: Note): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    //console.log(note)
    //!Hacemos dispatch de setActiveNote
    dispatch(setActiveNote(note));
  };
};

export const startSaveUpdatedNote = (): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(setSaving());

    const estado: any = getState;
    const { uid } = estado().authReducer;

    const { activeNote } = estado().journalReducer;
    const activeNewNote = { ...activeNote };

    //!Borramos la propiedad id de la nota que esta en el objeto activeNewNote con delete.
    //!no lo puedo hacer directo en el objeto activeNote

    delete activeNewNote.id;
    //console.log(activeNewNote)

    //!Creamos la referencia al objeto que queremos actualizar
    //! Usamos la propiedad id del objeto activeNote.id recuperado del store y no usamos el del nuevo objeto activeNewNote porque a ese objeto le quitamos la propiedad id con delete
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

    //! con  {merge: true} Se mantiene los campos existentes en el store en caso de que sen envien campos adicionales o nuevos en la data activeNewNote
    await setDoc(docRef, activeNewNote, { merge: true });

    dispatch(updateNotesSideBar(activeNote));
  };
};

export const startUploadingFiles = (files: FileList): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(setSaving());
    //console.log('thunk/startUploadingFiles',files)
    //const urlImg=await fileUpload(files[0])
    //console.log(urlImg)

    //! Para hacer una carga de archivos en simultaneo

    //! Creamos un arreglo de promesas
    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    //!Promise.all se encargara de ejecutar todas las propesas incluidas en la lista de promesas fileUploadPromises
    const photosUrls = await Promise.all(fileUploadPromises);

    //console.log(photosUrls)
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = (): any => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    const estado: any = getState;
    const { uid } = estado().authReducer;
    const { activeNote } = estado().journalReducer;
    console.log({ uid, activeNote });

    //!Creamos la referencia al objeto que queremos eliminar
    //! Usamos la propiedad id del objeto activeNote.id recuperado del store y no usamos el del nuevo objeto activeNewNote porque a ese objeto le quitamos la propiedad id con delete
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await deleteDoc(docRef);

    //!para elimnarlo de la nota activa de del areglo de notas
    dispatch(deleteNoteById(activeNote.id));
  };
};
