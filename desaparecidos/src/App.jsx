import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import retratoIcon from "./icons/missing.png"

import './App.css'

function App() {

  return (
    <>
      <div className='App'>
        <Navbar />
          
        <h1 className='title-h1'>
          <img className="icon" src={retratoIcon} alt="Retrato" />
          PESSOAS DESAPARECIDAS</h1>
        <div className="container">
          <Outlet />
        </div>
      </div>
      
    </>
  )
}

export default App
