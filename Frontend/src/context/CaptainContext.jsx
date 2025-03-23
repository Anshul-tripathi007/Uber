import React, { useState } from 'react'
import { createContext } from 'react'

export const CaptainDataContext= createContext();

const CaptainContext = ({children}) => {
    const [captainData, setcaptainData] = useState({})
    const [isloading, setisloading] = useState(false)
    const URL ="http://localhost:3000"

    const value={
        captainData,
        setcaptainData,
        isloading,
        setisloading,
        URL
    }

  return (
    <CaptainDataContext.Provider value={value}>
        {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
