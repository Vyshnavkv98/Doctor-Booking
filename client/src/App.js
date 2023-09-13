import './App.css';
import { useState, useEffect } from 'react';

import AdminLogin from './components/adminLogin/AdminLogin';
import { Routes, Route, useNavigate,BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import LandinPage from './pages/LandinPage';
import { login } from './redux/user';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import AdminHome from './pages/AdminHome';
import AdminUserControl from './pages/AdminUserControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Upload from './components/upload/Upload';
import DoctorLogin from './pages/doctor/doctorlogin/DoctorLogin';
import DoctorHomePage from './pages/doctor/doctorHomePage/DoctorHomePage';
import DoctorProfileVerify from './pages/doctor/doctorProfileVerification/DoctorProfileVerify';
import DoctorVerifyData1 from './pages/doctor/doctorVerifyData1/DoctorVerifyData1';
import AdiminDoctorVerify from './pages/AdiminDoctorVerify';
import AdminAddDepartment from './pages/AdminAddDepartment';
import AdminAllDepartmentDetails from './pages/AdminAllDepartmentDetails';
import AdiminDoctorVerification from './pages/AdminDoctorVerification';
import ManageDoctorSlots from './pages/doctor/doctorSlotAppointment/ManageDoctorSlots';
import AnimationWrapper from './animationWrapper/AnimationWrapper';


function App() {
  const cookies = new Cookies()
  const [relogin, setRelogin] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [adminLoginStatus, setAdminLoginStatus] = useState(false)
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

        
          <AnimationWrapper />
       
        <Routes>
           
           
          <Route path='/' element={<LandinPage />}></Route>
          <Route path='/admin' element={<AdminLogin />} ></Route>
          <Route path='/admin/dashboard' element={<AdminHome />}></Route>
          <Route path='/admin/usercontrol' element={<AdminUserControl />}></Route>
          <Route path='/admin/doctor-verify' element={<AdiminDoctorVerify />}></Route>
          <Route path='/admin/doctor-verificcation' element={<AdiminDoctorVerification />}></Route>
          <Route path='/admin/add-department' element={<AdminAddDepartment />}></Route>
          <Route path='/admin/departments' element={<AdminAllDepartmentDetails />}></Route>

          <Route path='/upload' element={<Upload />}></Route>

          <Route path='/doctor-home' element={<DoctorHomePage />}></Route>
          <Route path='/doctor-login' element={<DoctorLogin />}></Route>
          <Route path='/doctor-Profile-verify' element={<DoctorProfileVerify />}></Route>
          <Route path='/Doctor-verify1' element={<DoctorVerifyData1 />}></Route>
          <Route path='/Doctor-manage-slots' element={<ManageDoctorSlots />}></Route>



        </Routes>

        <ToastContainer />

      </AppContext.Provider>



    </div >
  );
}

export default App;
