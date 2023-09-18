import {combineReducers} from '@reduxjs/toolkit'
import userReducer from '../redux/user'
import adminReducer from '../redux/admin'
import doctorReducer from '../redux/doctor'
import searchReducer from '../redux/searchDoctor'
import appointmentReducer from '../redux/appointment'

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    doctor: doctorReducer,
    searchKeyword: searchReducer,
    appointment: appointmentReducer,
  });
  
  export default rootReducer;