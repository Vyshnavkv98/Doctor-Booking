import React ,{ useState }  from 'react'
import bgImg4 from "../../assets/img4.png"
import axios from '../../axios/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


function AdminLogin() {
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

const handleSubmit=async(e)=>{
  e.preventDefault()
  console.log(formData);
  try {
   const res= await axios.post("admin/login",formData)
   console.log(res);
   if(res.data.message==='login success'){
    toast.success("Login successfull",{
      position:toast.POSITION,
      autoClose:2000
      
    })
    navigate('/admin/dashboard')
   }
  } catch (error) {
    
  }
}


  return (
    <section className="h-screen flex flex-col md:flex-col justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-black">
    <div className="md:w-1/3 max-w-sm">
     
      <img
        src={bgImg4}
        alt="Sample image" className='tex-white mx-12' />
    </div>
    <h2 className='text-white font-bold text-3xl'>Admin Sign In</h2>
    <div className="md:w-1/3 max-w-sm">
      <div className="text-center md:text-left">
      
      
  
      </div>
      <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
      </div>
      <form onSubmit={handleSubmit}>
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" name='email' type="text" placeholder="Email Address" onChange={handleChange} />
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
        Don't have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="#">Register</a>
      </div>
    </div>
  </section>


  
  )
}

export default AdminLogin
