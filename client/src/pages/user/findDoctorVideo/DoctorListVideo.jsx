import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import FindDoctorVideoConsultation from '../../../components/user/videoConsultation/FindDoctorVideoConsultation'
import Footer from '../../../components/user/footer/Footer'
import DoctorList from '../../../components/user/doctorList/DoctorList'
import axios from '../../../axios/axios'


function DoctorListVideo() {
    const [open, setOpen] = useState(true)
    const [doctor, setDoctors] = useState([])
    const handleSidenav = (val) => {
        setOpen(val)
    }

    useEffect(() => {
        (async () => {
            try {
                const doctors = await axios.post('/getall-doctors');
                const doctorData=doctors.data.filter((doc)=>{
                  return  doc?.videoConsultationSlots

                })
                setDoctors([...doctorData ])
            } catch (error) {
                console.log(error);
            }
        })()
    },[])

    return (
        <Box display={'flex'} flexDirection={'column'} >

            <Grid position={'fixed'} width={'100%'} zIndex={1}>
                <TopNavBar />
            </Grid>

            <Grid display={'flex'}>
                <Grid position={'fixed'} mt={'6rem'}>
                    <SideNavBar handleSidenav={handleSidenav} />
                </Grid>
                {open && <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'22rem'} marginTop={'7rem'} minHeight={'100vh'}>
                    <DoctorList doctors={doctor} />
                    <Grid mt={3}><Footer /></Grid>
                </Grid>}
                {!open && <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'8rem'} marginTop={'7rem'} minHeight={'100vh'}>
                    <DoctorList  doctors={doctor}/>
                    <Grid mt={3}><Footer /></Grid>
                </Grid>}


            </Grid>



        </Box>
    )
}

export default DoctorListVideo
