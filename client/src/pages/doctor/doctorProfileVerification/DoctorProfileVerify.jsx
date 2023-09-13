import React from 'react'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import DoctorVer from '../../../components/doctorHomeNav/doctor-ver/Doctor-ver'
import imgDoc from '../../../assets/doctor_Detail.webp'
import { ImageList } from '@mui/material'

function DoctorProfileVerify() {
  return (
    <div>
    <div>
      <DoctorNavBar />
    </div>
    <div className='flex gap-0 p-0'>
      <div className='m-0 bg-green gap-0'>
        <DoctorSideNav />
      </div>
      <div className='flex-1'>
        <div className='flex-1 gap-0 text-2xl font-serif font-bold h-24  justify-center pt-8 m-0 px-6 bg-grey-shade shadow-sm w-full'>{'Profile'}</div>
        <div className='flex flex-1 m-0 pt-44 px-20'>
          <div className='flex-1 w-1/3'>
            <DoctorVer />
          </div>
          <div className='flex-1 w-2/3 m-0 p-0'>
            <img
              src={`${imgDoc}?w=164&h=164&fit=crop&auto=format`}
              alt={'title'}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  

  )
}

export default DoctorProfileVerify
