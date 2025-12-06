import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
    let token = localStorage.getItem('accessToken') || false;
  return (
    !token? <Outlet/> : <Navigate to={"/"}/>
  )
}

export default PublicRoute