import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios
 from 'axios';
const UserProtectedWrapper = ({children}) => {
    const navigate=useNavigate();
    const {URL}=useContext(UserDataContext);
    
    useEffect(() => {
      const token =localStorage.getItem('token')
      if(!token) navigate('/captain/login')
      async () => {
        const response =await axios.get(`${URL}/profile`, {
          headers:{
              authorization : `${token}`
          }
      })

      if(response.status!=200) navigate('/user/login')
      }
      
  },[])
    
        
  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectedWrapper
