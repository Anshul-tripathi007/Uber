import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserSignUp from './pages/userSignUp'
import CaptainLogin from './pages/captainLogin'
import CaptainSignUp from './pages/captainSignUp'
import Start from './pages/Start'
import Home from './pages/home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogin from './pages/UserLogin'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/home' element={<UserProtectedWrapper><Home/></UserProtectedWrapper>}/>
        <Route path='/captain/home' element={<CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>}/>
        <Route path='/user/login' element={<UserLogin/>}/>
        <Route path='/user/signup' element={<UserSignUp/>}/>
        <Route path='/captain/login' element={<CaptainLogin/>}/>
        <Route path='/captain/signup' element={<CaptainSignUp/>}/>
        <Route path='/captain/riding' element={<CaptainProtectedWrapper><CaptainRiding/></CaptainProtectedWrapper>}/>
      </Routes>
    </div>
  )
}

export default App
