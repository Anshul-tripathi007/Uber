import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import UserLogin from './pages/userLogin'
import UserSignUp from './pages/userSignUp'
import CaptainLogin from './pages/captainLogin'
import CaptainSignUp from './pages/captainSignUp'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/login' element={<UserLogin/>}/>
        <Route path='/user/signup' element={<UserSignUp/>}/>
        <Route path='/captain/login' element={<CaptainLogin/>}/>
        <Route path='/captain/signup' element={<CaptainSignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
