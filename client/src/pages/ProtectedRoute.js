import React from 'react'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {firm} = useAppContext()
    if(!firm){
        return <Navigate to='/landing'/>
    }
  return children
}

export default ProtectedRoute