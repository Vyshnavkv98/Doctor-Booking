import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { PiTwitterLogoThin } from 'react-icons/pi'
import { BiLogoGoogle } from 'react-icons/bi'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { AiOutlineInstagram } from 'react-icons/ai'


export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#f9f9f9' }}  >
      <Grid className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' display={'flex'} justifyContent={'space-between'}>
        <Grid className='me-5 d-none d-lg-block'>
          <Typography variant='subtitle1' textAlign={'center'}>Get connected with us on social networks:</Typography>
        </Grid>


        <Grid display={'flex'}  >

          <Divider variant='middle' />

          <Link href='' className='me-4 text-reset'>
            <FaFacebookF />
          </Link>
          <Link href='' className='me-4 text-reset'>
            <PiTwitterLogoThin />
          </Link>
          <Link href='' className='me-4 text-reset'>
            <BiLogoGoogle />
          </Link>
          <Link href='' className='me-4 text-reset'>
            <AiOutlineInstagram />
          </Link>
          <Link href='' className='me-4 text-reset'>
            <FaLinkedinIn />
          </Link>

        </Grid>
      </Grid>

      <Grid className=''>
        <Grid className='text-md-start mt-5'>
        <Divider />
          <Grid className='mt-3' display={'flex'} lineHeight={'2.25rem'}>
          
            <Grid md='3' lg='4' xl='3' alignItems={''} justifyItems={'start'} ml={4} >
             

              <Typography variant='subtitle2' fontSize={22} fontWeight={550} className='text-uppercase fw-bold mb-4'>
                {/* <MDBIcon color='secondary' icon='gem' className='me-3' /> */}
                Company name
              </Typography>
              <Typography color={'gray'}>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit.
              </Typography>
            </Grid>

            <Grid md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <Typography variant='subtitle2' fontSize={22} fontWeight={550} >Products</Typography>
              <Typography variant='subtitle2' color={'gray'}>
                <Link href='#!' className='text-reset'>
                  Angular
                </Link>
              </Typography >
              <Typography variant='subtitle2' color={'gray'}>
                <Link href='#!' className='text-reset'>
                  React
                </Link>
              </Typography>
              <Typography variant='subtitle2' color={'gray'}>
                <Link href='#!' className='text-reset'>
                  Vue
                </Link>
              </Typography>
              <Typography variant='subtitle2' color={'gray'}>
                <Link href='#!' className='text-reset'>
                  Laravel
                </Link>
              </Typography>
            </Grid>

            <Grid md='3' lg='2' xl='2'  >
              <Typography variant='subtitle2' fontSize={22} fontWeight={550} >Useful links</Typography>
              <Typography variant='subtitle2' color={'gray'}>
                <Link href='#!' className='text-reset'>
                  Pricing
                </Link>
              </Typography>
              <Typography variant='subtitle2' color={'gray'}>
                <Link href='#!' className='text-reset'>
                  Settings
                </Link>
              </Typography>
              <Typography variant='subtitle2' color={'gray'}>
                <Link href='#!' className='text-reset'>
                  Orders
                </Link>
              </Typography>
              <Typography variant='subtitle2' color={'gray'}>
                <Link href='#!' className='text-reset'>
                  Help
                </Link>
              </Typography>
            </Grid>

            <Grid md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <Typography variant='subtitle2' fontSize={22} fontWeight={550} >Contact</Typography>
              {/* <Typography>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                New York, NY 10012, US
              </Typography>
              <Typography>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@example.com
              </Typography>
              <Typography>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
              </Typography>
              <Typography>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </Typography> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <Link className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </Link>
      </Grid>
    </Box>
  );
}