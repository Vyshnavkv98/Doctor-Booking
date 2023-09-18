import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import FindDoctorVideoConsultation from '../../../components/user/videoConsultation/FindDoctorVideoConsultation'
import Footer from '../../../components/user/footer/Footer'

function SearchDoctorVideoConsultation() {

    const[open,setOpen]=useState(true)
    const handleSidenav=(val)=>{
          setOpen(val)
    }
    return (
        <Box display={'flex'} flexDirection={'column'} >

            <Grid position={'fixed'} width={'100%'} zIndex={1}>
                <TopNavBar />
            </Grid>

            <Grid display={'flex'}>
                <Grid position={'fixed'} mt={'6rem'}>
                    <SideNavBar handleSidenav={handleSidenav} />
                </Grid>
               {open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'22rem'} marginTop={'7rem'}>
                    <FindDoctorVideoConsultation />
                    <Grid mt={3}><Footer /></Grid>
                </Grid>}
               {!open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'8rem'} marginTop={'7rem'}>
                    <FindDoctorVideoConsultation />
                    <Grid mt={3}><Footer /></Grid>
                </Grid>}
                

            </Grid>

            

        </Box>
    )
}

export default SearchDoctorVideoConsultation
