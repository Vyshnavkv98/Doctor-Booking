import React from 'react'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import { Box, Button, Card, Grid, Typography } from '@mui/material'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import ManageSlots from '../../../components/doctorHomeNav/doctorManageSlots/ManageSlots'

function ManageDoctorSlots() {
  return (
    <Box bgcolor={'#F0F1F4'}>
      <Grid container spacing={2} display={'flex'} flexDirection={'row'} >
        <Grid item xs={1} sm={1}>
          {/* Doctor Side Nav */}
          <DoctorSideNav />
        </Grid>
        <Grid item xs={11} sm={11}>
          {/* Doctor NavBar */}
          <Grid container  display={'flex'} justifyContent={'center'} >
            <Grid item xs={12}>
              <DoctorNavBar />
            </Grid>
            <Grid item xs={11}  display={'flex'} flexDirection={'column'} justifyContent={'center'} marginTop={2}  >
              <Grid >
                <Card>
                  <Typography margin={2}>
                    Click any slots to mark as unavailabe
                  </Typography>
                </Card>
              </Grid>
              <Grid marginTop={2}>

                {/* Manage Slots */}
                <Card>
                  <ManageSlots />
                  <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'}> 
                  <Typography margin={2}>
                    Click any slots to mark as unavailabe
                  </Typography>
                 

                  </Grid>
                

                </Card>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ManageDoctorSlots
