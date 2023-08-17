import './App.css';
import { useState,useEffect } from 'react';
import Home from './pages/HomePage';
import OtpVerify from './components/otpverify/OtpVerify';
import Login from './components/login/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/AdminDashboard';
import AdminLogin from './components/adminLogin/AdminLogin';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { ProtectedRoute } from './services/ProtectedRouter';
import LandinPage from './pages/LandinPage';
import AdminDashboard from './pages/AdminDashboard';
import axios from 'axios';
import { login } from './redux/user';
import { adminLogin } from './redux/admin';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import AdminHome from './pages/AdminHome';
import AdminUserControl from './pages/AdminUserControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import Upload from './components/upload/Upload';


function App() {
  const cookies=new Cookies()
  const [relogin, setRelogin]=useState(false)
  const [loginStatus, setLoginStatus]=useState(false)
  const [adminLoginStatus, setAdminLoginStatus]=useState(false)
  const dispatch = useDispatch(login)


 




  

  return (
    <div className="">
      <AppContext.Provider value={{
        relogin: relogin, setRelogin: setRelogin,
        loginStatus: loginStatus,
        setLoginStatus: setLoginStatus,
        adminLoginStatus: adminLoginStatus,
        setAdminLoginStatus: setAdminLoginStatus
      }}>
        <Routes>
        
     
        (<Route path='/login' element={<LoginPage />} ></Route>)
        

        <Route exact path='/signup' element={!loginStatus?<Signup />:<Home/>} ></Route>
      
        <Route  path='/admin' element={<AdminLogin />} ></Route>
        <Route  element={<ProtectedRoute/>}>
        <Route path='/user/home' element={<Home />}></Route>
        </Route>
        <Route path='/' element={<LandinPage/>}></Route>
        <Route path='/admin/dashboard' element={<AdminHome />}></Route>
        <Route path='/admin/control' element={<AdminUserControl />}></Route>

        <Route path='/upload' element={<Upload />}></Route>


        </Routes>
          
        <ToastContainer/>

      </AppContext.Provider>


     
    </div>
  );
}

export default App;
