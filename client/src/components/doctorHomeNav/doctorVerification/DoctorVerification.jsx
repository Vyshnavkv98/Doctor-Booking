import { Box, Button, ButtonGroup, Card, Divider, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import img1 from '../../../assets/doctorVerify.jpg'
import { BiPencil } from 'react-icons/bi'
import { toast } from 'react-toastify';
import axios from '../../../axios/axios'
import ConfirmationModal from '../../../components/modal/ConfirmationModal'

function DoctorVerification() {
    const [doctorData, setDoctorData] = useState(null)
    const [blockStatus, setBlockStatus] = useState(false)
    const [verifyStatus, setVerifyStatus] = useState(false)

    const [modalOpen, setModalOpen] = useState(false);
    const [verifyModalOpen, setVerifyModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
    const openVerifyModal = () => {
      setVerifyModalOpen(true);
    };
  
    const closeVerifyModal = () => {
      setVerifyModalOpen(false);
    };
  

    const handleBlock = async() => {
        setBlockStatus(!blockStatus)
        const doctorDetails = { _id: doctorData._id, blockStatus: blockStatus }
      const response= await axios.post('/admin/block-doctor', doctorDetails)
      setDoctorData(response.data?.data)

    }
    const handleVerify = async() => {
        setVerifyStatus(true)
        const doctorDetails = { _id: doctorData?._id, isVerified:verifyStatus }
      const response= await axios.post('/admin/verify-doctor', doctorDetails)
      
      setDoctorData(response.data?.data)

    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('admin/getdoctor-notverified');
                if (!response.data) {
                    toast.error("invalid request", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000
                    })
                } else {
                    console.log(response);
                    setDoctorData(response.data[0])
                }

            } catch (error) { }
        })();
    }, [blockStatus]);



    const handleDownload = async () => {
        try {
            const response = await fetch(`${doctorData?.imgUrl}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'downloaded-image.jpg'; // You can customize the downloaded file name
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
    return (
        <Box width={'90%'} sx={{ margin: 7, boxShadow: '4' }} justifyContent={'center'}  >
            <Box component="form" noValidate sx={{ marginLeft: 7, marginRight: 7, marginTop: 7 }}>
                <FormGroup >
                    <Grid item xs={12} md={12} lg={12} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5" gutterBottom paddingTop={7}>
                            Doctor Verification
                        </Typography>
                        <Grid paddingTop={4}>
                            <Button sx={{ backgroundColor: '#009FFA', height: '3rem', color: 'white' }} type='submit' ><BiPencil fontSize={'1rem'} />Edit Profile</Button>
                        </Grid>
                    </Grid>

                    <hr />
                    <Grid container marginTop={3}>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                            <img src={img1} alt="" width="78%" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <Box width={'13em'} height={'13em'} sx={{ backgroundColor: 'white', border: 'outset', borderRadius: '100%' }} position={'absolute'} top={'35em'}>
                            <img src={doctorData?.image} alt="" style={{ borderRadius: '100%' }} />
                        </Box>
                    </Grid>



                    <Grid container spacing={3} paddingTop={2} marginTop={13} paddingLeft={2} display={'flex'} alignItems={'center'} >
                        <Grid xs={12} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                            <Typography variant='h5' fontWeight={'600'}>
                                {doctorData?.firstName} {doctorData?.lastName}
                            </Typography>
                            <Typography variant='h6' style={{ color: 'grey' }} fontWeight={500} paddingTop={2}>
                                {doctorData?.Specialization}
                            </Typography>
                        </Grid>


                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }}>Phone Number</FormLabel>

                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.phoneNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Email</FormLabel>
                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Registration number</FormLabel>
                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.RegisterNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Registration year</FormLabel>
                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.RegistrationYear}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Registration counsil</FormLabel>
                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.RegistartionCouncil}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >City</FormLabel>
                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.city}
                            </Typography>

                        </Grid>

                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Fee</FormLabel>
                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.RegisterFee}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Specialization</FormLabel>
                            {/* <TextField
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                    
                                  }}
                                  sx={{
                                    "& .MuiInputBase-root": {
                                        border: 'none',
                                        borderColor:'transparent', // Remove the border completely
                                        borderRadius: '20px', // Customize the border-radius
                                        "&:hover": {
                                            border: 'none', // Remove the border on focus
                                          },
                                      },
                                      marginTop: '10px',
                                  }}

                            /> */}
                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.Specialization}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Gender</FormLabel>
                            <Typography variant='h6' fontWeight={'600'}>
                                {doctorData?.gender}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Registration certificate</FormLabel>
                            <Grid display={'flex'} flexDirection={'column'}>
                                <Typography variant='h6' fontWeight={'600'}>
                                    {doctorData?.imgUrl}
                                </Typography>
                                <Button onClick={() => handleDownload()}>Download</Button>
                            </Grid>
                        </Grid>



                    </Grid>
                    <Grid container spacing={3} paddingTop={5}>


                        <Grid item xs={12} marginBottom={5}>
                            <ButtonGroup
                                disableElevation

                                // variant="contained"
                                aria-label="Disabled elevation buttons"
                                sx={{ '& > *': { m: 1, height: '45px', width: '10rem', color: 'white', borderRadius: '8px', margin: '2px' } }}

                            >
                               {!doctorData?.isVerified && <Button sx={{ backgroundColor: '#FDA600', color: 'white', fontWeight: 600, }} onClick={openVerifyModal}>Verify</Button>}
                               {doctorData?.isVerified && <Button  sx={{  fontWeight: 600, }}>Verified</Button>}
                              {!doctorData?.isBlocked && <Button sx={{ backgroundColor: '#009FFA', color: 'white', fontWeight: 600 ,paddingLeft:'5px' }} type='button' onClick={openModal}>Block</Button>

                              }
                              {doctorData?.isBlocked && <Button sx={{ backgroundColor: 'red', color: 'white', fontWeight: 600 ,paddingLeft:'5px'}} type='button' onClick={openModal}>Unblock</Button>
                              }
                               <ConfirmationModal open={modalOpen} onClose={closeModal} onConfirm={()=>handleBlock()} />
                               <ConfirmationModal open={verifyModalOpen} onClose={closeVerifyModal} onConfirm={()=>handleVerify()} />
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </FormGroup>
            </Box>

        </Box>
    )
}

export default DoctorVerification
