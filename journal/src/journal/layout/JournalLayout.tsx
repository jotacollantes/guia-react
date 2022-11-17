import { Box } from '@mui/material'
import React from 'react'
import { NavBar } from '../components';
interface Props {
    //! la prop children va a recibir JSX Elements o una lista de JSX Elements[]
  children: JSX.Element | JSX.Element[];
}

const drawerWidth=240
export const JournalLayout = ({children}: Props) => {
  return (
    //* Box es como un div
    <Box sx={{display: 'flex'}}>

        {/* navbar drawerWidth*/}
        <NavBar drawerWidth={drawerWidth} /> 
        {/* Sidebar drawerWidth*/}
    <Box component='main'
    sx={{flexGrow:1,p:3}}
    >
        {/* toolbar */}
        {children}


    </Box>

    </Box>
  )
}
