import React from 'react'
import { GrUserAdmin } from 'react-icons/gr'
import SerachForm from '../components/admin/searchForm/SerachForm'
import Sidebar from '../components/admin/sidebar/Sidebar'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AiOutlineCalendar } from 'react-icons/ai'
import AddDepartment from '../components/admin/addDepartment/AddDepartment'

function AdminAddDepartment() {
  return (
    <div className='bg-white flex h-screen'>
      <div>
        <Sidebar />
      </div>
      <div className='flex flex-col mt-5 flex-1'>
        <div className='mx-5 flex right-end justify-between'>
          <div className='w-3/4  flex-row'>
            {/* <SerachForm onSubmit={getData} /> */}
            <Breadcrumbs aria-label="breadcrumb">
           
        <Link  color="inherit" href="/">
        {/* <AiOutlineCalendar style={{  }} /> */}
          Home
        </Link>
        <Link color="inherit" href="/department">
          Departments
        </Link>
        <Typography color="textPrimary">
          Add department
        </Typography>
      </Breadcrumbs>
          </div>
          <div className=''>
            <GrUserAdmin className='text-4xl pt-1' />
          </div>
        </div>
        <div className='mt-3 flex-1 justify-center items-center'>
          <AddDepartment/>
        </div>
      </div>
    </div>
  )
}

export default AdminAddDepartment
