import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material"
import "../login/LoginStyle.css"
import { ToastContainer, toast } from 'react-toastify';
import axios from "../../axios/axios"
import LockIcon from '@mui/icons-material/Lock';
import bgImg5 from "../../assets/img5.png"
import Cookies from 'universal-cookie';
import * as yup from "yup"


import { userLoginValidator } from '../../validation/UserValidator';







function Login() {
  const cookies = new Cookies();
  const { relogin, setRelogin, loginStatus, setLoginStatus } = useContext(AppContext);
  const navigate = useNavigate()

  const [loginError, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleRegister = () => {
    navigate('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (formData.email === "" || formData.password === "") {
    //   // toast("sorry", "All fields are required!", "error");
    // } else {
    try {
      console.log('handle login');
      const { email, password } = formData

      const isValid = await userLoginValidator.isValid(formData)
      if (!isValid) {
        setError(isValid.message)
      }

      await axios.post("login", {
        email: email,
        password: password,
      })
        .then((response) => {
          if (!response.data) {
            setLoginStatus(false);
          } else {
            const { user, accessToken, refreshToken } = response.data;
            localStorage.setItem('access-token', accessToken);
            localStorage.setItem('refresh-token', refreshToken);

            setLoginStatus(true);
            toast.success("Login successfull", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 500
            });
            navigate('/user/home')
            setLoginStatus(true);
          }
        });

    } catch (error) {
      console.log(error, 'error');

    }

    // }
  };







  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-black">
      <div className="md:w-1/3 max-w-sm">

        <img
          src={bgImg5}
          alt="Sample image" className='tex-white mx-8' />
      </div>
      <h2 className='text-white font-bold text-3xl' > Sign In</h2>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">



        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
        </div>
        <p>{loginError}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          {loginError && <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded text-white" type="text" value={loginError} />
          }
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" name='email' type="text" placeholder="Email Address" onChange={handleChange} />
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" name='password' type="password" placeholder="Password" onChange={handleChange} />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">

            </label>
            <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
          </div>
          <div className="text-center md:text-left">
            <button className="mt-4 bg-green-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider w-full h-11" type="submit"  >Login</button>

          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left mt-5">
          Don't have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" onClick={() => handleRegister()}>Register</a>
        </div>
      </div>
    </section>



  )
}

export default Login
