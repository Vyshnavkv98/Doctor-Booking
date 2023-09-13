import React from 'react'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import PatientDetails from '../../../components/doctorHomeNav/doctor-patients/PatientDetails'

function DoctorHomePage() {
  return (
    <div>
      <div><DoctorNavBar /></div>
      <div className='flex'>
        <div>
        <DoctorSideNav/>
        </div>
        <div className='flex-1 mt-4 ml-2 mr-3'><PatientDetails/> </div>
      </div>
    </div>
  )
}

export default DoctorHomePage
