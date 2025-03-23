import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignUp = () => {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [ vehicleColor, setVehicleColor ] = useState('')
    const [ vehiclePlate, setVehiclePlate ] = useState('')
    const [ vehicleCapacity, setVehicleCapacity ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')
    const {URL} =useContext(CaptainDataContext)
    const navigate=useNavigate();
    
    const submitHandler= async (e)=>{
        e.preventDefault();
        const  newCap={
            name:name,
            email:email,
            password:password,
            vehicle:{
              capacity:vehicleCapacity,
              color:vehicleColor, 
              plate:vehiclePlate,
              vehicleType:vehicleType
            }
        }
        const response = await axios.post(`${URL}/captain/signup`,newCap)
        if(response.status==201){
            navigate("/captain/login")
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
        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
        <div><button className='border border-black'> Sign Up</button></div>
        <Link to='/user/login' className='text-blue-500'>Log In</Link>
      </form>
      <div className='self-end'><Link to='/user/login'><button className='border border-black mt-2'>User LogIn</button></Link></div>
      </div>
    </div>
  )
}

export default CaptainSignUp
