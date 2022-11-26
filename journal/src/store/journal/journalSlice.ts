import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { DocumentScannerOutlined, FunctionsOutlined } from '@mui/icons-material';


export interface Note {
    id?: string;
    title:string;
    body:string;
    date: number;
    imageUrls?:[]
    
}

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

    } ,
    setNotes:(state, action: PayloadAction<Note> )=>{

        // El listado de tareas desde firebase viene como un array [] al hacer el push directamente se crea un array en su interior [[{},{}]] y eso hace que la iteracion en el map del sideBar no funcione por ese motivo hay que barrerse el array que viene de firestore y hacer el push documento por documento.
        
        const arrayNotes:any= action.payload
        for (const note of arrayNotes) {
            state.notes.push(note)
        }
        
    } ,

    setSaving:(state)=>{
        //state.isSaving=true;
    } ,
    updateNote:(state, action)=>{

    } ,
    deleteNote:(state, action)=>{

    } 
}
});


// Action creators are generated for each case reducer function
export const { savingNewNote,addNewEmptyNote,setActiveNote,setNotes,setSaving,updateNote,deleteNote} =  journalSlice.actions;