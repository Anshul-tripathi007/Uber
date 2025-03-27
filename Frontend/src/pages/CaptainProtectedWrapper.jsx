import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectedWrapper = ({children}) => {
    const navigate=useNavigate()
    const {URL}=useContext(CaptainDataContext)
    
    useEffect(() => {
        const token =localStorage.getItem('token')
        if(!token) navigate('/captain/login')
        
        async ()=>{
          const response =await axios.get(`${URL}/captain/profile`, {
            headers:{
                authorization : `${token}`
            }
        })

        if(response.status!=200) navigate('/captain/login')
        }
    },[])
    
  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectedWrapper
