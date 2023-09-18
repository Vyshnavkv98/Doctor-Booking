// AnimationWrapper.js
import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from '../pages/LoginPage'
import Home from '../pages/HomePage';

import Login from '../components/login/Login';
import Signup from '../pages/Signup';
import FindDoctor from '../pages/doctor/findDoctor/FindDoctor';
import AppointmentConfirmation from '../pages/user/appointment/AppointmentConfirmation'
import Profile from '../components/profile/Profile';
import ListAllDoctor from '../pages/user/doctorList/ListAllDoctor';
import ProfilePage from '../pages/user/ProfilePage';
import {ProtectedRoute} from '../services/ProtectedRouter'
import PaymentSuccess from '../components/user/payment/PaymentSuccess';
import ConfirmAppointment from '../components/modal/ConfirmAppointment';
import DoctorProfile from '../pages/user/doctorProfile/DoctorProfile';
import FindDoctorVideoConsultation from '../components/user/videoConsultation/FindDoctorVideoConsultation';
import SearchDoctorVideoConsultation from '../pages/user/findDoctorVideo/SearchDoctorVideoConsultation';
import DoctorListVideo from '../pages/user/findDoctorVideo/DoctorListVideo';



const AnimationWrapper = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'  initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }} >
      <Routes location={location}>
      (<Route path='/login' element={<LoginPage />} ></Route>)
          <Route exact path='/signup' element={ <Signup />} ></Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/user/home' element={<Home />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
            <Route path='/find-doctor' element={<FindDoctor />}></Route>
            <Route path='/doctor-book' element={<ListAllDoctor />}></Route>
            <Route path='/appointment' element={<AppointmentConfirmation />}></Route>
            <Route path='/payment-success' element={<PaymentSuccess />}></Route>
            <Route path='/doctor-profileinfo' element={<DoctorProfile />}></Route>
            <Route path='/video-consultation' element={<SearchDoctorVideoConsultation />}></Route>
            <Route path='/doctor-book-video-consultation' element={<DoctorListVideo />}></Route>
          </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
