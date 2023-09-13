import { Grid } from '@mui/material'
import React from 'react'
import Appointment from '../../../components/user/appointmentConfirmation/Appointmentconfirm'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import TopNavBar from '../../../components/topNavBar/TopNavBar'


function AppointmentConfirmation() {
  return (
    
  <Grid display={'flex'} >
      
   <Grid  display={'flex'}  >
   <Grid  zIndex={10} height={'100vh'}>
        <SideNavBar />
    </Grid>
   
    <Grid display={'flex'} flexDirection={'column'}>
        <Grid >
        <TopNavBar/>
        </Grid>
        <Grid>
        <Appointment />
        </Grid>

    </Grid>
    </Grid>
  </Grid>
  )
}

export default AppointmentConfirmation
