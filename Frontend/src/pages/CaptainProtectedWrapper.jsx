import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectedWrapper = ({children}) => {
    const navigate=useNavigate()
    const {value}=useContext(CaptainDataContext)
    
    useEffect(() => {
        const token =localStorage.getItem('token')
        if(!token) navigate('/captain/login')
        
          async function checkAuthorization() {
            try {
              const response = await axios.get(`${value.URL}/captain/profile`, {
                headers: {
                  authorization: token,
                },
              });

              value.setcaptainData(response.data)

            } catch (err) {
              console.log("Error in authorization ");
              navigate("/captain/login");
              localStorage.removeItem("token");
            }
          }
          checkAuthorization();
    },[])
    
  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectedWrapper
