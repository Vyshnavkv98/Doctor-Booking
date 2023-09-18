import React from 'react'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import DoctorFind from '../../../components/doctorHomeNav/doctor_find/DoctorFind'
import { Grid,Box } from '@mui/material'
import Footer from '../../../components/user/footer/Footer'

function FindDoctor() {
  return (
    <Box>
      <Grid className='fixed w-full z-20'><TopNavBar /></Grid>
      <Grid><DoctorFind /> </Grid>
    <Grid>

    </Grid>
      <Footer />
    </Box>
  )
}

export default FindDoctor
