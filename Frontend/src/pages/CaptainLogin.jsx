import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const {URL,setcaptainData}=useContext(CaptainDataContext)
    const navigate=useNavigate()

    const submitHandler= async (e)=>{
      e.preventDefault();
      const capData={
        email:email,
        password:password
      }

      try{
        const response= await axios.post(`${URL}/captain/login`,capData)
        if(response.status==200){
          localStorage.setItem('token',response.data.token)
          setcaptainData(response.data.capexists)
          navigate('/captain/home')
        }
        setemail("")
        setpassword("")
      }
      catch(err){
        console.log(err)
      }
    }

  return (
    <div>
      <div className='flex flex-col justify-items-center p-10 h-screen'>
      <div>
      <form onSubmit={(e)=>submitHandler(e)}>
        <h2 className='p-2 text-xl'>Enter Email</h2>
        <input className='p-2'required type="email" placeholder='example@abc.com' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <h2 className='p-2 text-xl'>Enter Password</h2>
        <input className='p-2' required type="current-password" placeholder='*****'value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
        <div><button className='border border-black'> Log In</button></div>
        <Link to='/captain/signup' className='text-blue-500'>Create a new account</Link>
      </form>
       <div className='self-end'><Link to='/user/login'><button className='border border-black mt-2'>User LogIn</button></Link></div>
      </div>
    </div>
    </div>
  )
}

export default CaptainLogin
