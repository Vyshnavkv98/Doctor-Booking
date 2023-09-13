import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import img1 from '../../../assets/img2.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import { doc } from 'firebase/firestore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

function DoctorList({ doctors }) {
  const [isAppointmentTimeHidden, setAppointmentTimeHidden] = useState(false);
  const [doctorList, setDoctorList] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appointmentData, setAppointmentData] = useState({});
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);

  const navigate=useNavigate()

  const handleDateChange = (date) => {
    const formattedDate = format(date?.$d, 'MMMM, dd, yyyy');
    setSelectedDate(formattedDate)
  }

  const tomorrow = dayjs().add(1, 'day');

  useEffect(() => {
    setDoctorList([...doctors])
  }, [doctors])

  const goToPrevItem = (contentItems, index) => {
    console.log(contentItems);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + contentItems.length) % contentItems.length);
  };

  const goToNextItem = (contentItems, index) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
  };

  const handleAppointmentDiv = (index) => {
    setSelectedDoctorIndex(index);
    setAppointmentTimeHidden(true);
  }

  const handleAppointmentDivHidden = (index) => {
    setSelectedDoctorIndex(null);
    setAppointmentTimeHidden(false);
  }

  const handleAppointmentDetails = (time, index, date,id,doctor) => {
    const data={time,date,id,doctor}
    navigate('/appointment',{state:data})
  }

  return (
    <Grid container item xs={12} lg={12} md={12}>
      <Container maxWidth="xl">
        {doctorList && doctorList.map((doctor, index) => (
          <Box p={2} key={index}>
            <Divider variant='middle' sx={{ marginBottom: '1rem' }} />
            <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Grid display={'flex'} flexDirection={'row'}>
                <Grid item>
                  <img src={img1} alt="img" style={{ borderRadius: '100%', width: '10rem', height: '10rem' }} />
                </Grid>
                <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} spacing={3} padding={2}>
                  <Typography variant='h4' fontWeight={'500'} color={'#189FD8'}>
                    Dr.{doctor?.firstName} {doctor?.lastName}
                  </Typography>
                  <Typography variant='subtitle1' color={'grey'} fontWeight={'500'}>
                    {doctor?.specialization}
                  </Typography>
                  <Typography variant='subtitle2' fontWeight={'500'}>
                    27 years experience
                  </Typography>
                  <Typography variant='subtitle2' fontWeight={'500'}>
                    {doctor?.city}
                  </Typography>
                  <Typography variant='subtitle2' fontWeight={'500'}>
                    ₹{doctor.RegisterFee} Consultation Fees
                  </Typography>
                  <Link href="#" color="inherit" underline="none" style={{ fontSize: '14px', color: '#189FD8' }}>
                    {'view profile'}
                  </Link>
                </Grid>
              </Grid>
              <Grid display={'flex'} alignItems={'end'} >
                <Button variant='contained' sx={{ cursor: 'pointer' }} onClick={() => handleAppointmentDiv(index)}>Book Appointment</Button>
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: '1rem' }} variant='middle' />
            {isAppointmentTimeHidden && selectedDoctorIndex === index && (
            <Grid display={'flex'} justifyContent={'space-between'}>
            <Grid>
                <Button onClick={() => goToPrevItem(doctor?.AvailableSlots, index)} startIcon={<ArrowBack />} >
                  Previous
                </Button>
              </Grid>
              <Grid>
                <Button onClick={() => goToNextItem(doctor?.AvailableSlots, index)} endIcon={<ArrowForward />} >
                  Next
                </Button>
              </Grid>
            </Grid>
              )}
            {isAppointmentTimeHidden && selectedDoctorIndex === index && (
              <Grid display={'flex'} alignContent={'space-between'} width={'100%'}>
                <Grid>
                  <Grid display={'flex'} justifyContent={'space-between'} p={2} >
                    <Typography color={'green'}>{doctor?.AvailableSlots[currentIndex]?.date}</Typography>
                  </Grid>
                  <Grid display={'flex'} flexDirection={'column'}>
                    <Grid>
                      <Box display={'flex'} sx={{ display: 'block' }} flexWrap={'wrap'} margin={3}>
                        {doctor?.AvailableSlots[currentIndex]?.slots.sort().map((button, slotIndex) => (
                          <Button
                            key={button}
                            sx={{ margin: '0.5rem', width: '150px', }}
                            onClick={() => { handleAppointmentDetails(button, slotIndex, doctor?.AvailableSlots[currentIndex]?.date,doctor._id,doctor)}}
                            variant='outlined'
                          >
                            {button}
                          </Button>
                        ))}
                      </Box>
                    </Grid>
                    <Grid alignContent={'end'}>
                      <Link onClick={() => handleAppointmentDivHidden(index)} color="inherit" underline="none" style={{ fontSize: '14px', color: '#189FD8' }} >
                        {'Show less'}
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Box>
        ))}
      </Container>
    </Grid>
  )
}

export default DoctorList;
