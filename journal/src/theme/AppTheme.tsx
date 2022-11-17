import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { colorTheme } from './colorTheme';

interface Props {
    //! la prop children va a recibir JSX Elements o una lista de JSX Elements[]
  children: JSX.Element | JSX.Element[];
}


export const AppTheme = ({children}:Props) => {
  return (
    //! ThemeProvider es un Higher order components por eso recibe un children desde las props
    <ThemeProvider theme={colorTheme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {children}
    
  </ThemeProvider>
  )
}
