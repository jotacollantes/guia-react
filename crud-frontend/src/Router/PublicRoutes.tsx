import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

interface Props {
    //! la prop children va a recibir JSX Elements o una lista de JSX Elements[]
    children: JSX.Element ;
  }
export const PublicRoutes = ({children}:Props) => {
    const {user}=useContext(UserContext)
  return ((!user.token) ? children : <Navigate to="/empleados" />)
}
