import { Box, Typography } from '@mui/material'
import SampleDataTable from '../../sampleDataTable/SampleDataTable'

import React, { useEffect, useState } from 'react'
import axios from '../../../axios/axios'

function DepartmentDetails() {

  const [departments, setDepartments] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/admin/all-department')

        if (res.data) {
          setDepartments([...res.data.departments]);
        }


      } catch (error) {

      }
    })()


  }, [])


  return (


    <Box width={'90%'} height={'62vh'} sx={{ margin: 7, boxShadow: '4' }} justifyContent={'center'} justifyItems={'center'} alignItems={'center'}>
      <Box component="form" noValidate sx={{ marginLeft: 7, marginRight: 7, marginTop: 7 }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h5" gutterBottom paddingTop={7} fontWeight={'700'}>
            ALL DEPARTMENTS
          </Typography>
          <Typography variant="h6" color={'#019EFA'} sx={{ cursor: 'pointer', fontFamily: "sans-serif" }} gutterBottom paddingTop={7}>
            <span>Add Department</span>
          </Typography>
        </Box>
        <SampleDataTable departmentData={departments} />


        <hr />

      </Box>

    </Box>
  )
}

export default DepartmentDetails
