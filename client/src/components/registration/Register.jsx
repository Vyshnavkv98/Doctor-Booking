import React, { useState } from 'react'
import bgImg from "../../assets/img1.jpg"
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./Registration.css"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react"
import {auth} from "../../firebase";
import {toast} from "react-toastify"
import { signInWithPhoneNumber,RecaptchaVerifier } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import {firestore } from '../../firebase';
import axios from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import {useFormik} from "formik"
import { signUpSchema } from '../../helper/SignupSchema';









export default function Register() {


const navigate=useNavigate()

  // const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    phonenumber:"",
    password: "",
    cpassword:""

  });

  const {values,errors,handleSubmit,handleChange,handleBlur}=useFormik({
    initialValues:{
      firstname: "",
    lastname: "",
    email: "",
    dob: "",
    phonenumber:"",
    password: "",
    cpassword:""
    },
    validationSchema:signUpSchema,
    onSubmit:async(value) => {

      try {
           await axios.post('/signup',values)
          setshowOtp(true)
          } catch (error) {
            console.log(error);
          }
    }
  });
console.log();





  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOtp, setshowOtp] = useState(false)

  const handleOtp = (value) => {
    setOtp(value)
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData((prevdata) => ({
  //     ...prevdata,
  //     [name]: value
  //   }))
  // }


  // const handleSubmit = async(e) => {
  //   e.preventDefault()

  //   try {
  //    await axios.post('/signup',formData)

  //   console.log(formData, 'formdata');
  //   setshowOtp(true)
  //   } catch (error) {
      
  //   }

  // }


  const handleOtpSubmit=async(e)=>{
   e.preventDefault()
   const email=values.email
   const otpData={otp,email}
try {
    console.log(otpData,'otpdata');
    const res=await axios.post("/verfyotp",otpData)
  
    console.log(res.data.message,'84');
  if(res.data.message){
   
    toast.success("Registration successfull",{
      position:toast.POSITION.TOP_CENTER,
      autoClose:3000
    })

    navigate('/login')
  }

} catch (error) {
  
}

  }

   
    // function onSignUp() {
    //   setLoading(true);
    
      
    //   function captchaVerify() {
    //     return new Promise((resolve, reject) => {
    //       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //         'size': 'normal',
    //         'callback': (response) => {
    //           onSignUp()
  
    //           // reCAPTCHA solved, allow signInWithPhoneNumber.
    //           // ...
    //           setshowOtp(true);
             
    //         },
    //         'expired-callback': () => {
    //           // Response expired. Ask user to solve reCAPTCHA again.
    //           // ...
    //         }
    //       })
         
    //       if (window.recaptchaVerifier) {
    //         resolve(); 
    //       } else {
    //         reject(new Error('Captcha verification failed')); 
    //       }
    //     });
    //   }
    //   captchaVerify().then(() => {
    //       const appVerifier = window.recaptchaVerifier;
        
    //       const formatPh = '+' + formData.phonenumber;
    
    //       // Perform phone number authentication
    //       signInWithPhoneNumber(auth, formatPh, appVerifier)
    //         .then((confirmationResult) => {
              
    //           // Save the confirmation result to a variable for later use (e.g., in OTP verification)
    //           window.confirmationResult = confirmationResult;
    
    //           // Update loading state and show OTP input
    //           setLoading(false);
    //           setshowOtp(true);
    
    //           // Show success message to the user
    //           // toast.success('OTP sent successfully');
    //           console.log('from signinWithPhoneNumber');
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //           setLoading(false);
    //           // Handle authentication error (e.g., display an error message to the user)
    //         });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       setLoading(false);
    //       // Handle captcha verification error (e.g., display an error message to the user)
    //     });
    // }

    // function onOtpVerify(){
    //   setLoading(true)
    //   window.confirmationResult.confirm(otp).then(async(res)=>{
    //     console.log(res);
    //   }).catch(err=>{
    //     console.log(err.message,'gggggggggggg');
    //   })
    //   }


     



  return (
    <>

      {
        showOtp? <section className='bg-emerald-500 flex items-center justify-center h-screen'>
          <div>
          
            <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
              <h1 className='leading-normal text-white font-medium text-3xl mb-6'>OTP verification</h1>
              <>
                <div className=' bg-white text-emerald-400 w-fit mx-auto p-4 rounded-full'>
                  <BsFillShieldLockFill size={30} />

                </div>
              </>
              <label htmlFor="ph" className='font-bold text-white text-3xl text-center'>
                Enter your otp
              </label>
              <OtpInput OTPLength={6} otpType="number" disabled={false} autofocus className="" value={otp} onChange={(e)=>handleOtp(e)}></OtpInput>
              <button className='bg-emerald-600 width-full items-center flex gap-2 py-5 mt-3 h-2 text-white rounded' onClick={(e)=>handleOtpSubmit(e)}  >
                {
                  loading && <CgSpinner className='mt-1 mx-7 animate-spin ' size={22} />
                }

                <span className='font-bold px-24'>Verify Otp</span>
              </button>




            </div>
          </div>
        </section> : <section> <div className="register">
          <div className="col-1">
            <h2 className='font-bold text-3xl'>Sign In</h2>
            <span> register and enjoy the service</span>

            <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
              <TextField id="outlined-basic" name='firstname' label="*firstname" variant="outlined" fullWidth className='mt-8' value={values.name} onBlur={handleBlur} onChange={handleChange} />
              {<p className='form-error text-red-500'>{errors.firstname}</p>}
              <TextField id="outlined-basic" name='lastname' label="*lastname" variant="outlined" fullWidth className='mt-8' value={values.name} onBlur={handleBlur} onChange={handleChange} />
             
              <TextField id="outlined-basic" name='phonenumber' label="*phonenumber" variant="outlined" fullWidth className='mt-8' value={values.phonenumber} onBlur={handleBlur} onChange={handleChange} />
              {<p className='form-error text-red-500'>{errors.phonenumber}</p>}
              <TextField id="outlined-basic" name='email' label="*email" variant="outlined" fullWidth className='mt-8' value={values.email} onBlur={handleBlur} onChange={handleChange} />
              {<p className='form-error text-red-500'>{errors.email}</p>}
              <LocalizationProvider className='w-100' dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date of Birth" />
                </DemoContainer>
              </LocalizationProvider>
              <TextField id="outlined-basic" name='password' label="*password" variant="outlined" fullWidth className='mt-8' value={values.password} onBlur={handleBlur} onChange={handleChange} />
              {<p className='form-error text-red-500'>{errors.password}</p>}
              <TextField id="outlined-basic" label="*confirm password" name='cpassword' variant="outlined" fullWidth className='mt-8' value={values.cpassword} onBlur={handleBlur} onChange={handleChange} />
              {<p className='form-error text-red-500'>{errors.cpassword}</p>}
              {/* <Toaster toastOptions={{duration:4000}} /> */}
            <div id='recaptcha-container'></div>
              <button className='btn'>Sign In</button>
            </form>

          </div>
          <div className="col-2">
            <img src={bgImg} alt="" />
          </div>
        </div>
       </section>
      }

    </>
  )
}