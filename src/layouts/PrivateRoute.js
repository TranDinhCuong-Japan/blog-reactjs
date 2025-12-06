import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    let token = localStorage.getItem('accessToken') || false;
  return (
    token? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoute