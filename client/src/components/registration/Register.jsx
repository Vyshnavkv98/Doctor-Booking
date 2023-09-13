import React, { useState } from 'react'
import bgImg from "../../assets/img1.jpg"
import bgImg2 from '../../assets/doctor.jpg'
import { useForm } from 'react-hook-form';
import { FormLabel, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./Registration.css"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react"
import { auth } from "../../firebase";
import { toast } from "react-toastify"
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import axios from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import { signUpSchema } from '../../helper/SignupSchema';
import { boolean } from 'yup';
import { motion, AnimatePresence } from 'framer-motion';









export default function Register() {

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOtp, setshowOtp] = useState(false)
  const [user, setUser] = useState(true)
  const [countDown, setCountDown] = useState(true)
  const [countDownTime, setCountDownTime] = useState(15)

  const navigate = useNavigate()
const handleLogin=()=>{
  navigate('/login')
}
  // const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    phonenumber: "",
    password: "",
    cpassword: ""

  });

  const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      phonenumber: "",
      password: "",
      cpassword: ""
    },
    validationSchema: signUpSchema,
    onSubmit: async (value) => {

      try {
        if (user) {
          await axios.post('/signup', values)
          setshowOtp(true)
        } else {
          await axios.post('/doctor/signup', values)
          setshowOtp(true)
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  console.log();







  const handleOtp = (value) => {
    setOtp(value)
  }

  const handleUser = () => {
    setUser(!user)
  }


  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const email = values.email
    const otpData = { otp, email }
    try {

      if (user) {
        const res = await axios.post("/verfyotp", otpData)

        if (res.data.message) {

          toast.success("Registration successfull", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          })

          navigate('/login')
        }
      } else {
        const res = await axios.post("/doctor/verfyotp", otpData)

        if (res.data.message) {

          toast.success("Registration successfull", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          })

          navigate('/doctor-login')
        }
      }

    } catch (error) {

    }

  }

  const handleCoundown = async () => {
    const email = values.email
    const otpData = { otp, email }
    setCountDown(true)
    if (user) {
      const res = await axios.post("/signup", values)
      setInterval(() => {
        if (countDownTime > 0) {
          setCountDownTime((prev) => prev - 1)
        } else {
          clearInterval()
        }
        setCountDown(false)
      }, 1000)
    } else {
      const res = await axios.post("/doctor/signup", values)
      setInterval(() => {
        if (countDownTime > 0) {
          setCountDownTime((prev) => prev - 1)
        }
        setCountDown(false)
      })
    }
  }

  return (

    <motion.div
    className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} 
    >
      <>

        {
          showOtp ? <section className='bg-emerald-500 flex items-center justify-center h-screen'>
            <div>

              <div className='w-80 flex flex-col justify-center gap-4 rounded-lg p-4'>
                <h1 className='leading-normal text-white font-medium text-3xl mb-6'>OTP verification</h1>
                <>
                  <div className=' bg-white text-emerald-400 w-fit mx-auto p-4 rounded-full'>
                    <BsFillShieldLockFill size={30} />

                  </div>
                </>
                <label htmlFor="ph" className='font-bold text-white text-3xl text-center'>
                  Enter your otp
                </label>
                <OtpInput OTPLength={6} otpType="number" disabled={false} autofocus className="" value={otp} onChange={(e) => handleOtp(e)}></OtpInput>
                <button className='bg-emerald-600 width-full items-center flex gap-2 py-5 mt-3 h-2 text-white rounded' onClick={(e) => handleOtpSubmit(e)}  >
                  {
                    loading && <CgSpinner className='mt-1 mx-7 animate-spin ' size={22} />
                  }

                  <span className='font-bold px-24'>Verify Otp</span>
                </button>
                <div className='flex flex-row justify-between'>
                  <a className="text-red-600 cursor-pointer" >Login?</a>
                  <div>
                    {!countDown && <a className="text-blue-600 cursor-pointer" >Resend OTP  {countDownTime}</a>}
                    {countDown && <a className="text-blue-600 cursor-pointer" onClick={() => handleCoundown()} >Resend OTP  <span className='text-white'>{countDownTime}</span></a>}

                  </div>
                </div>




              </div>
            </div>
          </section> : <section className=''> <div className="register border-blue-600">
            <div className="col-1">
              {!user && <h2 className='font-bold text-3xl'>Doctor Sign Up</h2>}
              {user && <h2 className='font-bold text-3xl'>User Sign Up</h2>}
              <span> register and enjoy the service</span>
              <Grid display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
                <form id='form' className='flex flex-col' onSubmit={handleSubmit}>



                  <TextField id="outlined-basic" name='firstname' label="*firstname" variant="outlined" fullWidth sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} value={values.name} onBlur={handleBlur} onChange={handleChange} />
                  {<FormLabel sx={{ color: 'red' }}>{errors.firstname}</FormLabel>}
                  <TextField id="outlined-basic" name='lastname' label="*lastname" variant="outlined" sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} fullWidth value={values.name} onBlur={handleBlur} onChange={handleChange} />

                  <TextField id="outlined-basic" name='phonenumber' label="*phonenumber" variant="outlined" fullWidth sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} value={values.phonenumber} onBlur={handleBlur} onChange={handleChange} />
                  {<FormLabel sx={{ color: 'red' }}>{errors.phonenumber}</FormLabel>}
                  <TextField id="outlined-basic" name='email' label="*email" variant="outlined" fullWidth sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} value={values.email} onBlur={handleBlur} onChange={handleChange} />
                  {<FormLabel sx={{ color: 'red' }}>{errors.email}</FormLabel>}
                  {/* <LocalizationProvider className='w-100' dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date of Birth" />
                </DemoContainer>
              </LocalizationProvider> */}
                  <TextField id="outlined-basic" name='password' type='password' label="*password" variant="outlined" fullWidth sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} value={values.password} onBlur={handleBlur} onChange={handleChange} />
                  {<FormLabel sx={{ color: 'red' }}>{errors.password}</FormLabel>}
                  <TextField id="outlined-basic" label="*confirm password" type='password' name='cpassword' variant="outlined" fullWidth sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} value={values.cpassword} onBlur={handleBlur} onChange={handleChange} />
                  {<FormLabel sx={{ color: 'red' }}>{errors.cpassword}</FormLabel>}
                  {/* <Toaster toastOptions={{duration:4000}} /> */}

                  <button className='btn' type='submit'>Sign Up</button>
                </form>
              </Grid>
             <div className='flex justify-between'>
             {user && <div className="text-black items-end">
                Register as <a className="text-red-600 cursor-pointer" onClick={() => handleUser()}>Doctor?</a>

              </div>
              }
              {!user && <div className="text-black items-end">

                Register as <a className="text-red-600 cursor-pointer" onClick={() => handleUser()}>User?</a>
              </div>}
               <div className="text-black items-end">
             <a className="text-blue-500 cursor-pointer" onClick={() => handleLogin()}>Login here..</a>
              </div>
             </div>


            </div>
            <div className="col-2">
              <img src={bgImg2} alt="" />
            </div>
          </div>
          </section>
        }

      </>
    </motion.div>
  )
}