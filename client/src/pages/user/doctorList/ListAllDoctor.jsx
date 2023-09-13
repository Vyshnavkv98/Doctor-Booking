import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import DoctorList from '../../../components/user/doctorList/DoctorList'
import { useDispatch, useSelector } from 'react-redux'
import { setSerchKeyWords } from '../../../redux/searchDoctor'
import axios from '../../../axios/axios'


function ListAllDoctor() {
    const dispatch = useDispatch()
    const [location, setLocation] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [doctors, setDoctors] = useState([])
    const searchData = useSelector(state => state.searchKeyword?.searchKeyWords)
    if (searchData) {
        setLocation(searchData?.location)
        setSpeciality(searchData?.speciality)
    }
    dispatch(setSerchKeyWords(null))
    useEffect(() => {
        (async () => {
            try {
                const doctors = await axios.post('/getall-doctors');
                setDoctors([...doctors.data ])
            } catch (error) {
                console.log(error);
            }
        })()
    },[location])

    return (
        <Grid container display={'flex'} flexDirection={'row'}>
            <Grid item xs={2} lg={2} md={2}>
                <Grid position={'fixed'} >
                    <SideNavBar />
                </Grid>
            </Grid>

            <Grid item xs={10} lg={10} md={10} sx={{ paddingLeft: '2rem', paddingTop: '1rem' }} >
                <Grid position={'fixed'} width={'82%'} zIndex={'20'}>
                    <TopNavBar />
                </Grid>
                <Grid item xs={9} lg={9} md={9}>
                    <Grid marginTop={'4rem'}>
                        <DoctorList doctors={doctors}/>
                    </Grid>
                    
                </Grid>
            </Grid>

        </Grid>

    )
}

export default ListAllDoctor
