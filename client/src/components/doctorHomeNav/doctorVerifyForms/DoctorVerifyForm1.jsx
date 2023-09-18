import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormHelperText, FormLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, CircularProgress, Snackbar, LinearProgress } from '@mui/material';
import { useFormik } from 'formik';
import { doctorVerifySchema } from '../../../helper/SignupSchema';
import { Upload } from 'cloudinary-react';
import Axios from 'axios';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios/axios'
import { useDispatch, useSelector } from 'react-redux';



const defaultTheme = createTheme();

export default function DoctorVerifyForm1() {

  const doctor = useSelector(state => state.doctor.doctor?.doctor);


  const navigate = useNavigate()

  const [uploadData, setUploadData] = React.useState({
    isUploading: false,
    isSnackbarOpen: false,
  });
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const cloudName = 'dvxprkre3';
  const uploadPreset = 'hn5yx4md';
  const [clodFile, setCloudFile] = React.useState('')
  const [img, setImg] = React.useState(null)
  const [profile, setProfile] = React.useState(null)
  console.log(profile);
  const { isUploading, isSnackbarOpen } = uploadData;
  const handleChangeImg = (e) => {
    setImg(e.target.files[0])
  }
  const handleChangeProfileImg = (e) => {
    setProfile(e.target.files[0])
  }

  const [formData, setFormData] = React.useState({
    firstName: "",
    specialization: "",
    Gender: "",
    city: "",


  });


  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      firstName: '',
      specialization: '',
      gender: '',
      city: '',
      RegisterFee: 0,
      registrationCouncil: '',
      registerNumber: '',
      registrationYear: '',
      offline:true,
      chat:false,
      video:false


    },

    validationSchema: doctorVerifySchema,
    onSubmit: async (values) => {
      try {
        const files = [img, profile];
        const uploadPromises = [];

        for (const file of files) {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'hn5yx4md');
          data.append('cloud_name', 'dvxprkre3');

          const uploadPromise = Axios.post(`https://api.cloudinary.com/v1_1/dvxprkre3/image/upload`, data, {
            // onUploadProgress: ProgressEvent => {
            //  console.log(ProgressEvent.loaded / ProgressEvent.total * 100);
            // },
            onUploadProgress: (progressEvent) => {
              const progress = (progressEvent.loaded / progressEvent.total * 100);
              setUploadProgress(progress);
            },

          });

          uploadPromises.push(uploadPromise);
        }

        const uploadResponses = await Promise.all(uploadPromises);


        const secureUrls = uploadResponses.map(response => response.data.secure_url);

        if (uploadResponses) {
          toast.success("Details uploaded successfull", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          })

          setUploadData({ ...uploadData, isUploading: false, isSnackbarOpen: true });

          const doctorDatas = {
            ...values, _id: doctor?._id, imgUrl: secureUrls[0], image: secureUrls[1]
          }
          const response = await axios.post('verifydata', doctorDatas)
          if (response) useDispatch((loginDoctor(response.data.doctor)))
          if (doctor?.isVerified) {
            navigate('/doctor-home')
          }
        }
        setUploadProgress(0);
      } catch (error) {
        console.log(error);
        setUploadData({ ...uploadData, isUploading: false });
      }

    },
  });



  const [firstForm, setFirstForm] = React.useState(false)
  const [depNames, setDepNames] = React.useState([])

  React.useEffect(() => {
    const department = async () => {
      const res = await axios.get("/get-departments")
      let depname = []
      const names = res?.data?.departments.forEach((item) => {
        depname.push(item.departmentName)
      })
      setDepNames([...depname])
    }
    department()
  }, [])


  const names = [
    'Ayurveda',
    'Dentist',
    'Pediatricion',
    'Orthopedic Surgon',
    'General Physician',
    'Dental Surgon',
    'Dermatologist',
    'Cosmetics',
    'General Surgon',
    'Dental Surgon',

  ];

  const cities = [
    'bangalore',
    'chennai',
    'Delhi',
    'Gurgaon',
    'Hyderabad',
    'Kolkatha',
    'Mumbai',
    'Pune',
    'Kannur',
    'Kochi',
    'Trivandrum'
  ]

  const handleCloseSnackbar = () => {
    setUploadData({ ...uploadData, isSnackbarOpen: false });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {!firstForm && <FormControl>
          <Box
            sx={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h2" variant="h5">
              Hello Dr. VYSHNAV K V! Lets build your dedicated profile.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="given-name"
                    name="firstName"

                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    onChange={handleChange}
                  />
                  {<p className='form-error text-red-500'>{errors.firstName}</p>}
                </Grid>

                <Grid item xs={12}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Specialization</FormLabel>
                  <Select
                    fullWidth
                    item xs={12}
                    labelId="demo-multiple-name-label"
                    id="specialization"
                    name='specialization'
                    value={values.specialization}
                    onChange={handleChange}
                    input={<OutlinedInput label="Specilization" />}
                  >
                    {depNames.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} >
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    onChange={handleChange}
                  >
                    <FormControlLabel value="female" name='gender' control={<Radio />} label="Female" />
                    <FormControlLabel value="male" name='gender' control={<Radio />} label="Male" />
                    <FormControlLabel value="other" name='gender' control={<Radio />} label="Other" />

                  </RadioGroup>
                  {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.gender}</FormHelperText>}
                </Grid>

                <Grid item xs={12}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Cities</FormLabel>
                  <Select
                    fullWidth
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    label="City"

                    value={values.city}
                    name='city'
                    onChange={handleChange}
                    input={<OutlinedInput label="City" />}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                  {<p className='form-error text-red-500'>{errors.city}</p>}
                </Grid>
                <Grid xs={12} display={'flex'} mt={1} ml={2}>
                  <Grid item xs={12} >
                    <FormLabel id="demo-row-radio-buttons-group-label">Video Consultation?</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="video"
                      onChange={handleChange}
                    >
                      <FormControlLabel value="yes" name='video' control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" name='video' control={<Radio />} label="No" />

                    </RadioGroup>
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.video}</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} >
                    <FormLabel id="demo-row-radio-buttons-group-label">Chat consultation?</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="chat"
                      onChange={handleChange}
                    >
                      <FormControlLabel value="yes" name='chat' control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" name='chat' control={<Radio />} label="No" />

                    </RadioGroup>
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.chat}</FormHelperText>}
                  </Grid>
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="profilepic"
                    name="profilepic"
                    required
                    fullWidth
                    value={values.profilePic}
                    id="profilepic"
                    label="profile"
                    autoFocus
                    type='file'
                    onChange={(e) => handleChangeProfileImg(e)}>

                  </TextField>

                  {isUploading && <CircularProgress />}
                  <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    message="File uploaded successfully!"
                  />
                  {isUploading && <CircularProgress />}

                  {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.docs}</FormHelperText>}
                </Grid>
                <Grid item xs={12} >
                    <FormLabel id="demo-row-radio-buttons-group-label">Offline Consultation?</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="offline"
                      onChange={handleChange}
                    >
                      <FormControlLabel value="yes" name='offline' control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" name='offline' control={<Radio />} label="No" />

                    </RadioGroup>
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.offline}</FormHelperText>}
                  </Grid>

              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setFirstForm(true)}
              >
                Continue
              </Button>


              {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} />}



              <Grid container justifyContent="flex-end">
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </FormControl>
        }
        {firstForm &&
          <FormControl>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h2" variant="h5">
                Hello Dr. VYSHNAV K V! Lets build your dedicated profile.
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <TextField
                      autoComplete="registerNumber"
                      name="registerNumber"
                      required
                      fullWidth
                      id="registerNumber"
                      label="Register-number"
                      value={values.registerNumber}
                      onChange={handleChange}
                      autoFocus
                    />
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.registerNumber}</FormHelperText>}
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel id="demo-row-radio-buttons-group-label">RegistrationCouncil</FormLabel>
                    <Select
                      fullWidth
                      item xs={12}
                      labelId="Registration-council"
                      id="registrationCouncil"
                      name='registrationCouncil'
                      value={values.registrationCouncil}
                      onChange={handleChange}
                      input={<OutlinedInput label="registrationCouncil" />}
                    >

                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.registrationCouncil}</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      autoComplete="RegisterFee"
                      name="RegisterFee"
                      value={values.RegisterFee}
                      required
                      fullWidth
                      id="registerFee"
                      label="RegisterFee"
                      autoFocus
                      onChange={handleChange}
                    />
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.RegisterFee}</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      autoComplete="RegistrationYear"
                      name="registrationYear"
                      required
                      fullWidth
                      id="registrationYear"
                      label="RegistrationYear"
                      autoFocus
                      value={values.registrationYear}
                      onChange={handleChange}
                    />
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.registrationYear}</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      autoComplete="AddressLine1"
                      name="AddressLine1"
                      required
                      fullWidth
                      id="AddressLine1"
                      label="AddressLine1"
                      autoFocus
                      value={values.AddressLine1}
                      onChange={handleChange}
                    />
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.AddressLine2}</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      autoComplete="AddressLine2"
                      name="AddressLine2"
                      required
                      fullWidth
                      id="AddressLine2"
                      label="AddressLine2"
                      autoFocus
                      value={values.AddressLine2}
                      onChange={handleChange}
                    />
                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.AddressLine2}</FormHelperText>}
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      autoComplete="docs"
                      name="docs"
                      required
                      fullWidth
                      value={values.docs}
                      id="docs"
                      label="Document"
                      autoFocus
                      type='file'
                      onChange={(e) => handleChangeImg(e)}>
                    </TextField>
                    {isUploading && <CircularProgress />}
                    <Snackbar
                      open={isSnackbarOpen}
                      autoHideDuration={3000}
                      onClose={handleCloseSnackbar}
                      message="File uploaded successfully!"
                    />
                    {isUploading && <CircularProgress />}



                    {<FormHelperText sx={{ fontSize: 15 }} error='true'>{errors.docs}</FormHelperText>}
                  </Grid>




                </Grid>
                <Button
                  type='submit'
                  onSubmit={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                  </Grid>
                </Grid>

              </Box>
            </Box>
          </FormControl>
        }

      </Container>
    </ThemeProvider >
  );
}