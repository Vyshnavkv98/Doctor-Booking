import { Button, Card, CardContent, Container, Grid, Link, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MedicationIcon from '@mui/icons-material/Medication';
import MessageIcon from '@mui/icons-material/Message';
import img1 from '../../../assets/videoConsult.png'
import img2 from '../../../assets/gynaecologist.svg'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from '../../../axios/axios'

function FindDoctorVideoConsultation() {

    const [startIndex, setStartIndex] = useState(0);
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        const departmentsData = async () => {
            const response = await axios.get('/get-alldepartments')

            if (response) {
                setDepartments([...response?.data?.departments])
            }

        }
        departmentsData()
    }, [])
   

        const handlePrevClick = () => {
            setStartIndex(Math.max(0, startIndex - 1));
        };

        const handleNextClick = () => {
            setStartIndex(Math.min(departments.length - 1, startIndex + 1));
        };
        console.log(departments);
        return (
            <Grid display={'flex'} flexDirection={'column'}>

                <Grid width={'100%'} height={'48vh'} sx={{ display: 'flex', alignItems: 'end' }} bgcolor={'#f8e9e6'}>
                    <Container sx={{ display: 'flex', alignItems: 'end' }}>
                        <Grid mt={10} mb={2}>
                            <Typography variant='h4' mt={3}>
                                Skip the travel!
                            </Typography>
                            <Typography variant='h4' mt={2}>
                                Take Online Doctor Consultation
                            </Typography>
                            <Typography variant='subtitle2' mt={3}>
                                Private consultation Starts at just ₹199
                            </Typography>
                            <Button sx={{ mt: 2, }} variant='contained'>Consult Now</Button>
                            <Grid display={'flex'} spacing={1} mt={2}>
                                <Typography mt={3}>
                                    <WorkspacePremiumIcon />
                                    Verified Doctors
                                </Typography >
                                <Typography mt={3}>
                                    <MedicationIcon />
                                    Digital Prescription

                                </Typography>
                                <Typography mt={3}>
                                    <MessageIcon />
                                    Free Followup
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid width={'80%'} height={'80%'}>
                            <img src={img1} alt="" />
                        </Grid>
                    </Container>
                </Grid>
                <Grid mt={7}>
                    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid display={'flex'} width={'100%'} justifyContent={'space-between'}>
                            <Grid >
                                <Typography variant='h4'>
                                    25+ Specialities
                                </Typography>
                                <Typography variant='subtitle1' mt={2}>
                                    Consult with top doctors across specialities
                                </Typography>
                            </Grid>
                            <Button variant='outlined' sx={{ height: '3.6em' }}>
                                View all specialities
                            </Button>
                        </Grid>
                        <Grid display={'flex'} alignItems={'center'}>
                        <ArrowBackIcon
                                    onClick={handlePrevClick}
                                    style={{ cursor: 'pointer' }}
                                    disabled={startIndex === 0}
                                />
                            <Grid sx={{ display: 'flex', overflowX: 'auto', padding: '1rem',width:'100%' }}>
                                {departments.slice(startIndex, startIndex + 6).map((department, index) => (
                                    <Card
                                        key={index}
                                        style={{
                                            width: '12rem',
                                            height: '16rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            margin: '0 0.5rem',
                                        }}
                                    >
                                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Grid width={'8rem'} height={'8rem'} borderRadius={'100%'} mt={2} bgcolor={'white'}>
                                                <img
                                                    src={department.departmentImg}
                                                    style={{ height: '8rem', width: '8rem', borderRadius: '100%' }}
                                                    alt=""
                                                />
                                            </Grid>
                                            <Typography variant="subtitle1" component="div" marginTop={0.5}>
                                                {department?.departmentName}
                                            </Typography>
                                            <Typography variant="subtitle1" component="div" marginTop={0.5}>
                                                {department?.departmentHead}
                                            </Typography>
                                            <Link variant="subtitle2" component="div" marginTop={0.5}>
                                                consult now
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Grid>
                            {/* <Grid style={{ textAlign: 'center', margin: '1rem 0' }}></Grid> */}
                                
                                <ArrowForwardIcon
                                    onClick={handleNextClick}
                                    style={{ cursor: 'pointer' }}
                                    disabled={startIndex >= departments.length - 4}
                                />
                            
                        </Grid>


                    </Container>
                </Grid>

            </Grid>
        )
    }


    export default FindDoctorVideoConsultation
