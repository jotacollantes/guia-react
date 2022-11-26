import { AddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { startNewNote } from '../../store/journal'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {
  const dispatch=useDispatch()
  const {uid}=useSelector((state:RootState)=>state.authReducer)
  const {isSaving,activeNote}=useSelector((state:RootState)=>state.journalReducer)

  const onClickNewNote=async ()=>{
   await  dispatch(startNewNote(uid))
  }
  return (

    <JournalLayout>
      {/* Si no hay nota activa se muestra la pantalla sin formulario */}
      {!activeNote ?
      
       <NothingSelectedView />
       :
        <NoteView />
       }
       
       <IconButton
       disabled={isSaving}
       onClick={onClickNewNote}
       size='large'
       sx={{color:'white',
       backgroundColor:'error.main',
       ':hover':{backgroundColor:'error.main',opacity:0.9},
       position: 'fixed',
       right:50,
       bottom:50
      }}
       >
        <AddOutlined />

       </IconButton>
    </JournalLayout>
   
  )
}
