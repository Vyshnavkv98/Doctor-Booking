import { Box, Button, ButtonGroup, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addDepartmentSchema } from '../../../helper/SignupSchema'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import Axios from 'axios'
import axios from '../../../axios/axios'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../redux/user'


function AddDepartment() {
  const navigate =useNavigate()
  const handleNavigate=()=>{
    navigate('/admin/departments')
  }
  const [depImg, setDepImg] = useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleChangeImg = (e) => {
    setDepImg(e.target.files[0])
  }

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      departmentName: '',
      departmentHead: '',
      status: ''

    },
    validationSchema: addDepartmentSchema,
    onSubmit: async (values) => {
      try {
        const data = new FormData();
        data.append('file', depImg);
        data.append('upload_preset', 'hn5yx4md');
        data.append('cloud_name', 'dvxprkre3');

        const uploadPromise = await Axios.post(`https://api.cloudinary.com/v1_1/dvxprkre3/image/upload`, data, {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total * 100);
            setUploadProgress(progress);
          },

        });
        if (uploadPromise) {
          toast.success("department image uploaded successfull", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          })
          const departmentDetails={...values,departmentImg:uploadPromise.data?.secure_url}
          console.log(departmentDetails);
        const res=await axios.post("admin/add-department",departmentDetails)
        console.log(res);
          
        if(res){
          navigate('/admin/departments')
        }
        
        }

      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <Box width={'90%'} height={'62vh'} sx={{ margin: 7, boxShadow: '4' }} justifyContent={'center'} justifyItems={'center'} alignItems={'center'} onSubmit={handleSubmit}>
      <Box component="form" noValidate sx={{ marginLeft: 7, marginRight: 7, marginTop: 7 }}>
        <FormGroup onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom paddingTop={7}>
          ADD DEPARTMENT
        </Typography>
        <Link to={'/admin/departments'} style={{textAlign:'end',color:'blueviolet',}} variant="h5" gutterBottom paddingTop={7} onClick={handleNavigate}>
         All departments
        </Link>
        <hr />
        <Grid container spacing={3} paddingTop={5}>
          <Grid item xs={6} >
            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }}>Department Name</FormLabel>
            <TextField
              autoComplete="given-name"
              name="departmentName"
              required
              fullWidth
              margin='5'
              id="departmentName"
              label="Department Name"
              autoFocus
              value={values.departmentName}
              onChange={handleChange}
              style={{ marginTop: '25px' }}


            />
          </Grid>
          <Grid item xs={6} >
            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }} >Description</FormLabel>
            <TextField
              autoComplete="given-name"
              name="departmentHead"
              required
              fullWidth
              id="departmentHead"
              label="Department head"
              autoFocus
              value={values.departmentHead}
              onChange={handleChange}
              style={{ marginTop: '25px' }}

            />
          </Grid>



        </Grid>
        <Grid container spacing={3} paddingTop={5}>
          <Grid item xs={6} >
            <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: 'black' }}>department img</FormLabel>
            <TextField
              autoComplete="given-name"
              name="departmentImg"
              required
              fullWidth
              margin='5'
              id="departmentImg"
              label="Description"
              autoFocus

              type='file'
              onChange={(e) => handleChangeImg(e)}
              style={{ marginTop: '25px' }}


            />
          </Grid>
          <Grid item xs={12} >
            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="status"
              onChange={handleChange}
              value={values.status}
            >
              <FormControlLabel value="active" name='status' control={<Radio />} label="active" />
              <FormControlLabel value="inActive" name='status' control={<Radio />} label="inActive" />

            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup
              disableElevation
              // variant="contained"
              aria-label="Disabled elevation buttons"
              sx={{ '& > *': { m: 1, height: '45px', width: '10rem', color: 'white', borderRadius: '8px' } }}

            >
              <Button sx={{ backgroundColor: '#FDA600' }}>Reset</Button>
              <Button sx={{ backgroundColor: '#009FFA' }} type='submit'>Submit</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        </FormGroup>
      </Box>

    </Box>
  )
}

export default AddDepartment
