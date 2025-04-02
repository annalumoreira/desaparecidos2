import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

import './App.css'

function App() {

  return (
    <>
      <div className='App'>
        <Navbar />
        <h1>Desaparecidos</h1>
        <div className="container">
          <Outlet />
        </div>
      </div>
      
    </>
  )
}

export default App
