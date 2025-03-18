import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignUp = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(name,email,password)
        setname("")
        setemail("")
        setpassword("")
    }

  return (
    <div className='flex flex-col justify-items-center p-10 h-screen'>
      <div>
      <form onSubmit={(e)=>submitHandler(e)}>
      <h2 className='p-2 text-xl'>Enter Name</h2>
      <input className='p-2'required type="text" placeholder='type here' value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <h2 className='p-2 text-xl'>Enter Email</h2>
        <input className='p-2'required type="email" placeholder='example@abc.com' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <h2 className='p-2 text-xl'>Enter Password</h2>
        <input className='p-2' required type="current-password" placeholder='*****'value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
        <div><button className='border border-black'> Sign Up</button></div>
        <Link to='/user/login' className='text-blue-500'>Log In</Link>
      </form>
      <div className='self-end'><Link to='/captain/login'><button className='border border-black mt-2'>Captain LogIn</button></Link></div>
      </div>
    </div>
  )
}

export default UserSignUp
