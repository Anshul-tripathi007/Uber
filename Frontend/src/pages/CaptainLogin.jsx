import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(email,password)
        setemail("")
        setpassword("")
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
