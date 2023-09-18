import { Box, Card, CardContent, Divider, Grid, Rating, Typography } from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSpring, animated } from 'react-spring';

function DoctorProfile() {
  const [doctorData, setdoctorData] = useState(null)
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation()
  useEffect(() => {
    const doctorData = location.state
    setdoctorData(doctorData)
  }, [])
  console.log(doctorData);
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollY((prevScrollY) => prevScrollY + 1);
    }, 150); // Adjust the interval for the scrolling speed

    return () => clearInterval(scrollInterval);
  }, []);
  const texts = 'helo safdhsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdk'
  const cardStyles = useSpring({
    transform: `translateY(-${scrollY * 10}px)`, // Adjust the multiplier for scroll speed
  });
  return (
    <>
      <Box bgcolor={'lightBlue'} height={'100vh'} width={'100vw'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Grid display={'flex'} bgcolor={'white'} width={'90%'} height={'90%'} >
          <Grid item width={'35%'} bgcolor={'white'} display={'flex'} flexDirection={'column'} >
            <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} mt={5} >
              <img src={doctorData?.image} width={'250px'} height={'250px'} alt="" />
            </Grid>

            <Divider sx={{ mt: 3 }} variant='middle' />

            <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} mt={5} >
              <Card sx={{ width: '20rem', height: '25rem' }}>
                <Typography variant='h5' fontWeight={550} textAlign={'center'} zIndex={12}>
                  Rating & Reviews
                </Typography>
                <Divider sx={{ mt: 3,zIndex:'12' }} variant='middle' />
                <Grid>
                  <animated.div style={{ ...cardStyles, overflow: 'hidden' }}>
                    <CardContent >
                      <Card sx={{marginTop:'10px'}}>
                      <Typography variant="body2" m={1}>
                        {texts}
                      </Typography>
                      </Card>
                      <Card sx={{marginTop:'10px'}}>
                      <Typography variant="body2" color={'blue'} m={1}>
                        {texts}
                      </Typography>
                      </Card>
                      <Card sx={{marginTop:'10px'}}>
                      <Typography variant="body2" color={'blue'} m={1}>
                        {texts}
                      </Typography>
                      </Card>
                      <Card sx={{marginTop:'10px'}}>
                      <Typography variant="body2" color={'blue'} m={1}>
                        {texts}
                      </Typography>
                      </Card>
                      <Card sx={{marginTop:'10px'}}>
                      <Typography variant="body2" color={'blue'} m={1}>
                        {texts}
                      </Typography>
                      </Card>
                      <Card sx={{marginTop:'10px'}}>
                      <Typography variant="body2" color={'blue'} m={1}>
                        {texts}
                      </Typography>
                      </Card>
                      <Card sx={{marginTop:'10px'}}>
                      <Typography variant="body2" color={'blue'} m={1}>
                        {texts}
                      </Typography>
                      </Card>
                 
                     
                    
                    </CardContent>
                  </animated.div>

                </Grid>
              </Card>
            </Grid>

            <Grid>

            </Grid>
          </Grid>
          <Grid item width={'65%'} display={'flex'} flexDirection={'column'}>
            <Grid m={5} display={'flex'} flexDirection={'column'} spacing={3}>
              <Typography variant='h4' fontWeight={550}>
               Dr.{doctorData?.firstName} {doctorData?.lastName}
              </Typography>
              <Typography variant='h7' color={'blueviolet'} >
                {doctorData?.Specialization}
              </Typography>


              <Typography variant='subtitle1' color={'lightgrey'} >
                {'MBBS'} {'MD'}
              </Typography>
            </Grid>
            <Grid marginLeft={5} mt={1}>
              <Rating name="read-only" value={4} readOnly />

            </Grid>

            <Grid marginLeft={5} mt={3} display={'flex'}>
              <AccountCircleIcon />
              <Typography variant='h7' ml={3} fontWeight={550}>About</Typography>
            </Grid>
            <Divider sx={{ mt: 3 }} variant='middle' />
            <Grid display={'flex'} columnSpacing={5} mt={3}>
              <Grid marginLeft={5} mt={1}>
                <Typography variant='subtitle2' style={{ marginBottom: '10px' }}>
                  Phone number
                </Typography>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  Address
                </Typography>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  Email
                </Typography>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  City
                </Typography>
              </Grid>

              <Grid marginLeft={5} mt={1}>
                <Typography variant='subtitle2' style={{ marginBottom: '10px' }}>
                  : {doctorData?.phoneNumber}
                </Typography>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  : {doctorData?.AddressLine1}, {doctorData?.AddressLine2}
                </Typography>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  :{doctorData?.email}
                </Typography>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  : {doctorData?.city}
                </Typography>
              </Grid>

            </Grid>
            <Divider sx={{ mt: 3 }} variant='middle' />
            <Grid display={'flex'}>
              <Grid marginLeft={5} mt={2}>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  Birth day
                </Typography>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  gender
                </Typography>

              </Grid> <Grid marginLeft={5} mt={2}>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  : Birth day:
                </Typography>
                <Typography variant='subtitle1' style={{ marginBottom: '10px' }}>
                  : gender:
                </Typography>

              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default DoctorProfile
