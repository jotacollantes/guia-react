import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { DocumentScannerOutlined, FunctionsOutlined } from '@mui/icons-material';


export interface Note {
    id?: string;
    title:string;
    body:string;
    date: number;
    imageUrls:string[]
    //imageUrls:string[][]
    
}

type PhotosUrls = string[]

export interface journalState {
    
    isSaving: boolean;
    messageSaved:string;
    notes:Note[]; //!Para que no aparezca el mensaje Argument of type not assignable to parameter type 'never'
    activeNote:Note|null
    
  }

  const initialState: journalState= {
    
      isSaving: false,
      messageSaved:'',
      notes:[],
      activeNote:null,
    };

export const journalSlice = createSlice({
 name: 'journalSlice',
 initialState,
 reducers: {
    savingNewNote :(state)=>{
        state.isSaving=true;
    },
    addNewEmptyNote: (state, action: PayloadAction<Note> ) => {
        //console.log('entro: ', action.payload)
        state.notes.push(action.payload)
        state.isSaving=false;
},

    setActiveNote:(state, action: PayloadAction<Note> )=>{
        
        state.activeNote=action.payload
        state.messageSaved='';

    } ,
    setNotes:(state, action: PayloadAction<Note> )=>{

        // El listado de tareas desde firebase viene como un array [] al hacer el push directamente se crea un array en su interior [[{},{}]] y eso hace que la iteracion en el map del sideBar no funcione por ese motivo hay que barrerse el array que viene de firestore y hacer el push documento por documento.
        
        const arrayNotes:any= action.payload
        for (const note of arrayNotes) {
            state.notes.push(note)
        }
        
    } ,

    setSaving:(state)=>{
        state.isSaving=true;
        state.messageSaved='';
        //Todo: mensaje de error
    } ,
    //!Este es un reducer para actualizar las notas en la barra lateral
    updateNotesSideBar:(state, action:PayloadAction<Note> )=>{
        state.isSaving=false;
        const newArrayNotes=[]
        const updatedNote:Note= action.payload
        for (const note of state.notes) {
              if (note.id===updatedNote.id){
                //  const objNote={
                //     id: updatedNote.id,
                //     title:updatedNote.title,
                //     body:updatedNote.body,
                //     date: updatedNote.date
                // }
                newArrayNotes.push(updatedNote)
              }
              else
              {
                newArrayNotes.push(note)
              }
              
        }
        state.notes=newArrayNotes
        state.messageSaved=`${action.payload.title}, fue actualizado correctamente`

    } ,
    setPhotosToActiveNote:(state, action: PayloadAction<PhotosUrls> )=>{
        console.log(action.payload)
        console.log(state.activeNote?.imageUrls?.length)
        
        if (state.activeNote?.imageUrls.length ===0) {
            
            for (const urlImg of action.payload) {
                state.activeNote.imageUrls.push(urlImg)
            }
            
        }
        else
        {
           state.activeNote!.imageUrls=[...state.activeNote!.imageUrls,...action.payload]
        }
        
        state.isSaving=false

    } ,
    clearNotesLogout:(state)=>{
        state.isSaving= false,
        state.messageSaved='',
        state.notes=[],
        state.activeNote=null
    },

    deleteNoteById:(state, action: PayloadAction<string>)=>{
        state.activeNote=null;
        state.notes= state.notes.filter( (note) => note.id !==action.payload)
    } 
}
});


// Action creators are generated for each case reducer function
export const { savingNewNote,addNewEmptyNote,setActiveNote,setNotes,setSaving,updateNotesSideBar,deleteNoteById,setPhotosToActiveNote,clearNotesLogout} =  journalSlice.actions;