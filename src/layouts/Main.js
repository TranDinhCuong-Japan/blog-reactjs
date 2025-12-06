import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Main = () => {
  return (
    <div>
        <Header/>
        <div id="layoutSidenav">
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Main