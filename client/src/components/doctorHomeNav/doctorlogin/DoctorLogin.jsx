import React ,{ useEffect, useState }  from 'react'
import bgImg4 from "../../../assets/doctor.jpg"
import axios from '../../../axios/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {  loginDoctor } from '../../../redux/doctor'


function DoctorLogin() {
const [loginError,setError]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[formData,setFormData]=useState({
    email:'',
    password:''
  })
const handleChange=(event)=>{
  const{name,value}=event.target
  setFormData((prevData)=>({
      ...prevData,
      [name]:value
  }))
}

const handleReg=()=>{
  navigate('/signup')
}

useEffect(()=>{
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = emailRegex.test(formData.email);
if(!isValidEmail){
  setError('Please enter valid email address')
}else{
  setError('')
}
},[formData.email])


const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
   const res= await axios.post("doctor/login",formData)
   console.log(res.data.status);
   if(res.status===200){
    const {accessToken, refreshToken } = res.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log(res.data,'28');
    dispatch(loginDoctor(formData))
    if(res.data.doctor.isVerified===true)navigate('/doctor-home')
    else navigate('/doctor-verify1')
    
    toast.success("Login successfull",{
      position:toast.POSITION,
      autoClose:2000
      
    })
   
   }
  } catch (error) {
    
  }
}
useEffect(()=>{
  const token=localStorage.getItem('accessToken')
  if(token){
    navigate('/doctor-home')
  }
})


  return (
    <section className="h-screen flex flex-col bg-black md:flex-col justify-center md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
    <div className="md:w-1/3 max-w-sm ">
     
      <img
        src={bgImg4}
        alt="Sample image" className='tex-white mx-9' />
    </div>
    <h2 className='text-white font-bold text-3xl'>Doctor Sign In</h2>
    <div className="md:w-1/3 max-w-sm">
      <div className="text-center md:text-left">
      
      
  
      </div>
      <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
      </div>
      <form onSubmit={handleSubmit}>
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" name='email' type="text" placeholder="Email Address" onChange={handleChange} />
      {loginError && <p className='text-red-400'>{loginError}</p>}
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" name='password' type="password" placeholder="Password" onChange={handleChange}  />
      <div className="mt-4 flex justify-between font-semibold text-sm">
        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
        
        </label>
        <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
      </div>
      <div className="text-center md:text-left">
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
      
      </div>
      </form>
      <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        Don't have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="#" onClick={handleReg}>Register</a>
      </div>
    </div>
  </section>


  
  )
}

export default DoctorLogin
