import { Box, Button, ButtonGroup, Container, FormControlLabel, Grid, Paper, RadioGroup, FormGroup, Typography, TextField, Radio, FormLabel } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { userEditSchema } from '../../helper/SignupSchema';
import { useFormik } from 'formik';
import Axios from 'axios'
import axios from '../../axios/axios'
import { toast } from 'react-toastify';

import { loginUser } from '../../redux/user'

function Profile() {
  const [editProfile, setEditProfile] = useState(false)
  const [profileimg, setProfileimg] = useState(null)
  const [userBasicDetails, setUserBasicDetails] = useState({})
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.user?.user)


  console.log(userData, 'from profile');
  const HandleEditProfile = () => {
    setEditProfile(true)
  }
  const fileInputRef = useRef(null);

  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };

  const handleProfileImage = (e) => {
    if (e.target.files.length > 0) {
      const img = e.target.files[0];
      setProfileimg(img);
    }
  };
  useEffect(() => {

    setUserBasicDetails({ ...userData })
  
  },[])

  //  const userBasicDetails = useSelector(state => state.user.user?.user)


  const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      firstName: userData?.firstName || '',
      address: userData?.address || '',
      city: userData?.city || '',
      bloodGroup: userData?.bloodGroup || '',
      phoneNumber: userData?.phoneNumber || '',
      gender: userData?.gender || '',
      district: userData?.district || '',


    },
    validationSchema: userEditSchema,
    onSubmit: async (e, item) => {
      try {

        const data = new FormData();
        data.append('file', profileimg);
        data.append('upload_preset', 'hn5yx4md');
        data.append('cloud_name', 'dvxprkre3');

        const uploadPromise = await Axios.post(`https://api.cloudinary.com/v1_1/dvxprkre3/image/upload`, data, {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total * 100);

          },


        });
        console.log(uploadPromise);
        const userDetails = { ...values, profileImg: uploadPromise.data.secure_url, userId:userBasicDetails._id }

        if (!uploadPromise) {
          toast.error("Image upload failed", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          })
        } else {

          const userFullDetails = await axios.post('/edit-user', userDetails)
          if (userFullDetails) {
            dispatch(loginUser(userFullDetails))
            toast.success("Details edited successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000
            })
          }
        }

      } catch (error) {
        console.log(error);
      }
    }
  });


  return (
    <Box>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(41, 50, 141,   )',
          color: '#fff',
          mt: 7,
          backgroundRepeat: 'no-repeat',
          borderRadius: 7,
          margin: 2,
          backgroundPosition: 'center',
          backgroundImage: ` url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
          minHeight: '400px',


        }}
      >
      </Paper>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none', borderRadius: '5px' }} alt="Banner" />}
      <Grid item height={'auto'}
        sx={{ marginTop: 3, marginLeft: 9, boxShadow: '4', position: 'absolute', top: '25rem', background: 'white', borderRadius: 5 }}
        justifyContent={'center'}
        justifyItems={'center'}
        alignItems={'center'}
        zIndex={'40'}
        width={'75vw'}

      >

        {!editProfile && <Grid item xs={12} component="form" noValidate sx={{ marginLeft: 7, marginRight: 7, marginBottom: 5 }}>
          <FormGroup >
            <Typography variant="h5" gutterBottom paddingTop={7}>
              My Profile
            </Typography>
            <hr />
            <Grid display={'flex'} flexDirection={'row'}>


              {!userData?.profileImg &&
                <label style={{ cursor: 'pointer' }} >
                  <Avatar
                    style={{
                      width: '6rem',
                      height: '6rem',
                      borderRadius: '2rem',
                      outline: '2px',
                      outlineColor: 'black',
                      marginTop: '1rem'
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                </label>
              }
              {userData?.profileImg &&
                <img style={{ borderRadius: '100%', width: '10rem', height: '10rem' }} src={userData?.profileImg} alt="" />
              }


              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h6" gutterBottom paddingLeft={5} paddingTop={5} fontWeight={600}>
                  {userData?.firstName} {userData?.lastName}
                </Typography>
                <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} sx={{ paddingLeft: '40px', font: 'bold' }} >{userData?.email}</FormLabel>
              </Box>

            </Grid>

            <Grid container paddingTop={3} >
              <Grid item xs={3} display={'flex'} flexDirection={'column'} >
                <FormLabel id="demo-row-radio-buttons-group-label" >Name:</FormLabel>
                <Typography variant="h7" gutterBottom fontWeight={600} paddingTop={1}>
                  {userData?.firstName} {userData?.lastName}
                </Typography>

              </Grid>
              <Grid item xs={3} display={'flex'} flexDirection={'column'} >
                <FormLabel id="demo-row-radio-buttons-group-label" >Address:</FormLabel>
                <Typography variant="h7" gutterBottom fontWeight={600} paddingTop={1}>
                  {userData?.address}
                </Typography>
              </Grid>
              <Grid item xs={3} display={'flex'} flexDirection={'column'} >
                <FormLabel id="demo-row-radio-buttons-group-label"  >City:</FormLabel>
                <Typography variant="h7" gutterBottom fontWeight={600} paddingTop={1}>
                  {userData?.city}
                </Typography>
              </Grid>
              <Grid item xs={3} display={'flex'} flexDirection={'column'} >
                <FormLabel id="demo-row-radio-buttons-group-label"  >Phone Number:</FormLabel>
                <Typography variant="h7" gutterBottom fontWeight={600} paddingTop={1}>
                  {userData?.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={3} display={'flex'} flexDirection={'column'}>
                <FormLabel id="demo-row-radio-buttons-group-label"  >Blood Group:</FormLabel>
                <Typography variant="h7" gutterBottom fontWeight={600} paddingTop={1}>
                  {userData?.bloodGroup}
                </Typography>

              </Grid>
              <Grid item xs={3} display={'flex'} flexDirection={'column'} >
                <FormLabel id="demo-row-radio-buttons-group-label"  >District:</FormLabel>
                <Typography variant="h7" gutterBottom fontWeight={600} paddingTop={1}>

                  {userData?.phoneNumber}

                </Typography>
              </Grid>



            </Grid>
            <Grid container spacing={3} paddingTop={1}>
              <Grid item xs={3} >
              </Grid>
              <Grid item xs={12} >
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="status"
                  readOnly
                >
                  <FormControlLabel value="active" name="status" control={<Radio />} label="Male" />
                  <FormControlLabel name="status" control={<Radio />} label="Female" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup
                  disableElevation
                  // variant="contained"
                  aria-label="Disabled elevation buttons"
                  sx={{ '& > *': { m: 1, height: '45px', width: '10rem', color: 'white', borderRadius: '8px' } }}

                >
                  <Button sx={{
                    backgroundColor: '#60FDA0', color: 'white',
                  }} onClick={() => HandleEditProfile()}>Edit</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        }
        {editProfile && <Box component="form" noValidate sx={{ marginLeft: 7, marginRight: 7, marginBottom: 5 }} onSubmit={handleSubmit}>
          <FormGroup  >
            <Typography variant="h5" gutterBottom paddingTop={7}>
              Edit profile
            </Typography>
            <hr />
            <Grid display={'flex'} flexDirection={'row'} marginLeft={'1rem'}>

              <label style={{ cursor: 'pointer' }}>
                {!profileimg && <Avatar
                  style={{
                    width: '6rem',
                    height: '6rem',
                    borderRadius: '2rem',
                    outlineColor: 'black',
                    marginTop: '1rem'

                  }}
                >

                  <PersonIcon />
                  <TextField
                    type="file"
                    style={{ display: 'none' }}
                    //  ref={fileInputRef}
                    //value={profileimg}
                    onChange={(e) => {
                      handleProfileImage(e)
                    }}
                  />

                </Avatar>
                }
                {profileimg && <Grid>
                  <img src={`${URL.createObjectURL(profileimg)}`} style={{ width: '8rem', height: '8rem', borderRadius: '100%' }} alt="" />
                  <TextField
                    type="file"
                    style={{ display: 'none' }}
                    //  ref={fileInputRef}
                    //value={profileimg}
                    onChange={(e) => {
                      handleProfileImage(e)
                    }}
                  />

                </Grid>

                }
              </label>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h6" gutterBottom paddingLeft={5} paddingTop={5} fontWeight={600}>
                  {userData?.firstName}{userData?.lastName}
                </Typography>
                <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} sx={{ paddingLeft: '40px', font: 'bold' }} >{userData?.email}</FormLabel>
              </Box>

            </Grid>

            <Grid container  >
              <Grid item xs={6} padding={3} display={'flex'} flexDirection={'column'} >
                <FormLabel id="demo-row-radio-buttons-group-label" >Name</FormLabel>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  margin='5'
                  id="firstName"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                  value={values.firstName}

                  // onChange={handleChange}
                  style={{ marginTop: '25px' }}


                />


              </Grid>
              <Grid item xs={6} padding={3} >
                <FormLabel id="demo-row-radio-buttons-group-label" >Address:</FormLabel>
                <TextField
                  autoComplete="given-name"
                  name="address"
                  required
                  fullWidth
                  margin='5'
                  id="address"
                  label="address"
                  autoFocus
                  value={values.address}
                  onChange={handleChange}
                  style={{ marginTop: '25px' }}
                />


              </Grid>
              <Grid item xs={6} padding={3} >
                <FormLabel id="demo-row-radio-buttons-group-label"  >City:</FormLabel>
                <TextField
                  autoComplete="given-name"
                  name="city"
                  required
                  fullWidth
                  margin='5'
                  id="address"
                  label="City"
                  autoFocus
                  value={values.city}
                  onChange={handleChange}
                  style={{ marginTop: '25px' }}
                />

              </Grid>
              <Grid item xs={6} padding={3}>
                <FormLabel id="demo-row-radio-buttons-group-label"  >Phone Number:</FormLabel>
                <TextField
                  autoComplete="given-name"
                  name="phoneNumber"
                  required
                  fullWidth
                  margin='5'
                  id="phoneNumber"
                  label="PhoneNumber"
                  autoFocus
                  value={values?.phoneNumber}
                  onChange={handleChange}
                  style={{ marginTop: '25px' }}
                />
              </Grid>
              <Grid item xs={6} padding={3}>
                <FormLabel id="demo-row-radio-buttons-group-label"  >Blood Group:</FormLabel>
                <TextField
                  autoComplete="given-name"
                  name="bloodGroup"
                  required
                  fullWidth
                  margin='5'
                  id="bloodGroup"
                  label="BloodGroup"
                  autoFocus
                  value={values.bloodGroup}
                  onChange={handleChange}
                  style={{ marginTop: '25px' }}
                />

              </Grid>
              <Grid item xs={6} padding={3}>
                <FormLabel id="demo-row-radio-buttons-group-label"  >District:</FormLabel>
                <TextField
                  autoComplete="given-name"
                  name="district"
                  required
                  fullWidth
                  margin='5'
                  id="district"
                  label="District"
                  autoFocus
                  value={values.district}
                  onChange={handleChange}
                  style={{ marginTop: '25px' }}
                />
              </Grid>



            </Grid>
            <Grid container spacing={3} paddingTop={1}>
              <Grid item xs={3} >
              </Grid>
              <Grid item xs={12} marginLeft={'1rem'}>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="status"
                  readOnly
                >
                  <FormControlLabel value="male" onChange={handleChange} name="gender" control={<Radio />} label="Male" />
                  <FormControlLabel name="gender" value='female' onChange={handleChange} control={<Radio />} label="Female" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} padding={3} marginLeft={'1rem'}>
                <ButtonGroup

                  disableElevation
                  // variant="contained"
                  aria-label="Disabled elevation buttons"
                  sx={{ '& > *': { m: 1, height: '45px', width: '10rem', color: 'white', borderRadius: '8px' } }}

                >
                  <Button type='submit' onSubmit={handleSubmit} sx={{
                    backgroundColor: '#60FDA0', color: 'white',
                  }} padding={3}  >Submit</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
        }


      </Grid>
    </Box>


  )
}

export default Profile
