import React from 'react'

import SideNavBar from '../sidenavbar/SideNavBar'
import AddFileButton from '../addFile/AddFileButton'
import AddFolder from '../addFile/AddFolder'
import TopNavBar from '../topNavBar/TopNavBar'
import UserHome from '../user/UserHome'
import { Grid } from '@mui/material'
import Footer from '../user/footer/Footer'

function home() {

  return (
    <Grid container style={{ height: '100vh' }} display={'flex'} >
      <Grid item style={{ position: 'fixed', height: '100%', }}>
        <SideNavBar />
      </Grid>
      {/* style={{ marginLeft: '340px', padding: '20px' }} */}
      <Grid item style={{ marginLeft: '340px', padding: '20px', position: 'relative' }} >
        <TopNavBar />
        <UserHome />
        <Footer />
      </Grid>
    </Grid>



  )
}

export default home
