import React from 'react'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import DoctorFind from '../../../components/doctorHomeNav/doctor_find/DoctorFind'

function FindDoctor() {
  return (
    <div>
      <div className='fixed w-full z-20'><TopNavBar /></div>
      <div><DoctorFind /> </div>
    </div>
  )
}

export default FindDoctor
