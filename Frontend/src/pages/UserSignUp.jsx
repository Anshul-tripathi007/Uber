import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignUp = () => {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const {URL}=useContext(UserDataContext)
    const navigate=useNavigate();
    const submitHandler= async (e)=>{
        e.preventDefault();
        const  newuser={
            name:`${name}`,
            email:`${email}`,
            password:`${password}`
        }
        console.log(`${URL}/user/signup`)
        const response = await axios.post(`${URL}/signup`,newuser)
        if(response.status==201){
            const user=response.data.user
            navigate("/user/login")
        }
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
