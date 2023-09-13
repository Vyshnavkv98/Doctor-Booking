import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Link, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Form, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AppointmentSchema } from '../../../helper/AppointmentSchema';
import axios from '../../../axios/axios'
import appointment from '../../../redux/appointment'
import {loadStripe} from '@stripe/stripe-js'

function Appointmentconfirm() {

  const dispatch = useDispatch()
  const [doctor, setDoctor] = useState({})
  const [userDetails, setUserDetails] = useState({})
  const location = useLocation()
  const [slotdata, setSlotdata] = useState(null)

  const userData = useSelector(state => state?.user?.user?.user)
  useEffect(() => {
    const doctors = location?.state?.doctor
    setDoctor({ ...doctors })

    const slotData = location.state
    setSlotdata(slotData)

  }, [])
  const { errors, handleSubmit, handleBlur, handleChange, values } = useFormik({
    initialValues: {
      name: `${userData?.firstName} ${userData?.lastName}` || '',
      mobile: userData?.phoneNumber || '',
      email: userData?.email || '',
      reason: '',
      consultaionFee: location?.state?.doctor?.RegisterFee || 0,
    },
    validationSchema: AppointmentSchema,
    onSubmit: async () => {
      try {

        const appointmentData = { ...slotdata, name: values.name, mobile: values.mobile,email: values.email, reason: values.reason, fee: values.consultaionFee, userId: userData._id, doctorId: doctor._id }
        const appointmentDetails = await axios.post('/add-appointment', appointmentData)
        if (appointmentDetails !== undefined) {
          
          // dispatch(appointment(appointmentDetails))
          const paymetInfo={name:values.name,RegisterFee:500}
          await axios.post("/create-checkout-session",paymetInfo)
          .then((res)=>{
            if(res.data.paymentDetail){
              window.location.href=res.data.paymentDetail
            }
          })
          .catch((err)=>console.log(err.message))
        }

      } catch (error) {
        console.log(error);
      }
    }
  });



  return (
    <Box height={'100vh'} bgcolor={'rgb(247,247,247)'} p={0}>
      <Grid  >

        <Grid item xs={12} md={12} m={5} display={'flex'} flexDirection={'row'} justifyContent={'center'} >
          <Grid item xs={6} width={'100%'} display={'flex'} justifyContent={'center'} m={3} >
            <Paper variant='outlined' sx={{ height: '30rem', width: '45%', margin: '3rem', borderRadius: '1rem', backgroundColor: 'white', minWidth: '25rem' }}>
              <Grid width={'100%'} display={'flex'} m={2}>
                <HomeIcon sx={{ backgroundColor: 'green', color: 'white', borderRadius: '100%' }} />

                <Typography variant='subtitle1' fontWeight={600} ml={3}>
                  In-clinic Appointment
                </Typography>

              </Grid>
              <Divider sx={{ width: '90%', marginLeft: '5%' }} />
              <Grid width={'100%'} display={'flex'} m={2}>
                <Grid display={'flex'} flexDirection={'column'} width={'90%'}>
                  <Grid display={'flex'} justifyContent={'space-between'}>
                    <Grid display={'flex'} >
                      <PermContactCalendarIcon /><Typography variant='subtitle2'>{`  on ${location.state.date}`}</Typography>
                    </Grid>
                    <Grid display={'flex'} >
                      <AccessTimeIcon /><Typography variant='subtitle2'>{`  at ${location.state.time}`}</Typography>
                    </Grid>
                  </Grid>

                  <Link variant='subtitle2' mt={1}>
                    Change date & Time
                  </Link>
                </Grid>
                <Grid></Grid>

              </Grid>

              <Divider sx={{ width: '90%', marginLeft: '5%' }} />
              <Grid width={'90%'} display={'flex'} m={2} >
                <img src={doctor.image} width={'30%'} height={'30%'} alt="" />

                <Grid display={'flex'} flexDirection={'column'} width={'90%'}>
                  <Typography variant='h6' fontWeight={600}>
                    Dr.{doctor.firstName} {doctor.lastName}
                  </Typography>
                  <Typography variant='subtitle2' style={{ color: 'GrayText' }}>
                    {doctor.Specialization}
                  </Typography >
                  <Typography variant='subtitle2' style={{ color: 'GrayText' }}>
                    Dentist, Preventive Dentistry,
                  </Typography>
                  <Typography variant='subtitle2' style={{ color: 'GrayText' }}>
                    Public Health Dentist, Dental Surgeon
                  </Typography>

                </Grid>


              </Grid>
              <Divider sx={{ width: '90%', marginLeft: '5%' }} />

              <Grid width={'90%'} display={'flex'} m={2} >
                <img src={doctor.image1} width={'30%'} height={'30%'} alt="" />

                <Grid display={'flex'} flexDirection={'column'} width={'90%'}>
                  <Typography variant='subtitle2' style={{ color: 'GrayText' }}>
                    {doctor.Specialization}
                  </Typography >
                  <Typography variant='subtitle2' style={{ color: 'GrayText' }}>
                    Dentist, Preventive Dentistry,
                  </Typography>
                  <Typography variant='subtitle2' style={{ color: 'GrayText' }}>
                    Public Health Dentist, Dental Surgeon
                  </Typography>

                </Grid>


              </Grid>

            </Paper>


            <Grid marginLeft={3} width={'25rem'} mt={3}  >
              <Box component={'form'} onSubmit={handleSubmit}>
                <Typography variant='h5' fontSize={24} fontWeight={550}>
                  Patient Details
                </Typography>

                <Grid mt={3} display={'flex'} flexDirection={'column'}>
                  <FormLabel sx={{ fontWeight: '550' }}>*This in-clinic appointment is for:</FormLabel>

                  <FormLabel >*Name:</FormLabel>
                  <TextField name='name' value={values.name} sx={{ backgroundColor: 'white', width: '100%' }} size='small' onChange={handleChange}>
                  </TextField>
                  <FormLabel sx={{ color: 'red' }}>{errors.name}</FormLabel>
                </Grid>
                <Grid mt={3}>
                  <FormLabel >*Mobile*</FormLabel>
                  <TextField name='mobile' value={values.mobile} sx={{ backgroundColor: 'white', width: '100%' }} size='small' onChange={handleChange}>
                  </TextField>
                  <FormLabel sx={{ color: 'red' }}>{errors.mobile}</FormLabel>

                </Grid>
                <Grid mt={3}>
                  <FormLabel>*Email</FormLabel>
                  <TextField name='email' value={values.email} sx={{ backgroundColor: 'white', width: '100%' }} size='small' onChange={handleChange}>
                  </TextField>
                  <FormLabel sx={{ color: 'red' }}>{errors.email}</FormLabel>

                </Grid>
                <Grid mt={3}>
                  <FormLabel >*Reason:</FormLabel>
                  <TextField name='reason' value={values.reason} sx={{ backgroundColor: 'white', width: '100%' }} size='small' onChange={handleChange}>
                  </TextField>
                  <FormLabel sx={{ color: 'red' }}>{errors.reason}</FormLabel>

                </Grid>
                <Grid mt={2}>
                  <FormLabel sx={{ fontWeight: '550' }}>*Choose a payment option to Book Appointment</FormLabel>
                  <Grid display={'flex'}>
                    {doctor.RegisterFee && (
                      <RadioGroup name="consultaionFee" value={doctor.RegisterFee} onChange={handleChange}>
                        <FormControlLabel value={doctor.RegisterFee} control={<Radio />} label={`₹ ${doctor.RegisterFee}`} />
                      </RadioGroup>
                    )}
                    <Typography variant='subtitle2' pt={1.5} style={{ color: 'GrayText' }}>consultation fee</Typography>
                  </Grid>
                </Grid>

                <Grid mt={3}>
                  <Button onSubmit={handleSubmit} type='submit' variant='contained' fullWidth>confirm</Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>


        </Grid>
        <Grid>

        </Grid>
      </Grid>
    </Box>

  )
}

export default Appointmentconfirm
