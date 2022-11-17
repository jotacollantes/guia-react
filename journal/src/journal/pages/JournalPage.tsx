import { Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'

export const JournalPage = () => {
  return (

    <JournalLayout>
       {/* para usar el h1 definido por el tme hay que usar Variant */}
       <Typography >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, laborum veniam, dolore ea reiciendis ducimus dolor, eaque omnis provident at est laudantium beatae hic officiis cupiditate qui non facere quisquam?</Typography>
       {/* Nothing Selected  */}
       {/* NoteView */}
    </JournalLayout>
   
  )
}
