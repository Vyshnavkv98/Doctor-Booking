import React from 'react'
import Register from '../components/registration/Register'
import TopNavBar from '../components/topNavBar/TopNavBar'
import { Grid } from '@mui/material'

function Signup() {
  return (
  <Grid bgcolor={''}  >
      <Grid>
      <TopNavBar />
    </Grid>
 <Grid>
      <Register />
    </Grid>
  </Grid>
   
  )
}

export default Signup
