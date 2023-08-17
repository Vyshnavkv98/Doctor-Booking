import React, { useState } from 'react'
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react"

function OtpVerify() {
    const[otp,setOtp]=useState("")
    const[loading,setLoading]=useState(false)
    const[showOtp,setshowOtp]=useState(false)
const handleOtp=(e)=>{
    setOtp(()=>{
        otp=e.target.value
    })
}

  return (
    <section className='bg-emerald-500 flex items-center justify-center h-screen'>
        <div>
            <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
                <h1 className='leading-normal text-white font-medium text-3xl mb-6'>OTP verification</h1>
                <>
                <div className=' bg-white text-emerald-400 w-fit mx-auto p-4 rounded-full'>
                    <BsFillShieldLockFill size={30}/>

                </div>
                </>
                <label htmlFor="ph" className='font-bold text-white text-3xl text-center'>
                    Enter your otp
                </label>
               <OtpInput OTPLength={6} otpType="number"  disabled={false} autofocus className="" value={otp} onChange={handleOtp}></OtpInput>
               <button className='bg-emerald-600 width-full items-center flex gap-2 py-5 mt-3 h-2 text-white rounded' >
                {
                    loading && <CgSpinner className='mt-1 mx-7 animate-spin ' size={22} />
                }
                
               <span className='font-bold px-24'>Verify Otp</span>
               </button>
               
              
                

            </div>
        </div>
    </section>
    
  )
}

export default OtpVerify
