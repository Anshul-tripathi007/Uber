import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'

const UserLogin = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate =useNavigate()
    const {setuser,URL}=useContext(UserDataContext)

    const submitHandler=async (e)=>{
        e.preventDefault();
        const userData={
          email:email,
          password:password
        }
 
        console.log(userData)
        try{
          const response= await axios.post(`${URL}/login`,userData)
          if(response.status==200){
            console.log(response)
            localStorage.setItem('token',response.data.token)
            setuser(response.data.user)
            navigate('/home')
          }
          setemail("")
          setpassword("")
        }
        catch(err){
          console.log(err)
        }

        
    }

  return (
    <div className='flex flex-col justify-items-center p-10 h-screen'>
      <div>
      <form onSubmit={(e)=>submitHandler(e)}>
        <h2 className='p-2 text-xl'>Enter Email</h2>
        <input className='p-2'required type="email" placeholder='example@abc.com' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <h2 className='p-2 text-xl'>Enter Password</h2>
        <input className='p-2' required type="current-password" placeholder='*****'value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
        <div><button className='border border-black'> Log In</button></div>
        <Link to='/user/signup/' className='text-blue-500'>Create a new account</Link>
      </form>
      <div className='self-end'><Link to='/captain/login'><button className='border border-black mt-2'>Captain LogIn</button></Link></div>
      </div>
    </div>
  )
}

export default UserLogin
