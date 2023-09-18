import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Link, Paper, Typography } from '@mui/material'
import imgBanner from '../../assets/docBanner.png'
import React from 'react'
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img1.webp'
import img3 from '../../assets/img2.webp'
import img4 from '../../assets/img3.webp'
import img5 from '../../assets/img6.png'
import img6 from '../../assets/img5.webp'
import { useNavigate } from 'react-router-dom'

const data = [
  {
    title: 'Instant video consultaion',
    img: img2,
    subTitle: 'Connect with 60 secs'
  },
  {
    title: 'Find your nearest doctor',
    img: img3,
    subTitle: 'Confirm appointments'
  },
  {
    title: 'Medicine',
    img: img4,
    subTitle: 'Medicine in yoyr doorstep Medicine in yoyr doorstep'
  },
  {
    title: 'Lab Test',
    img: img5, subTitle: 'Connect with 60 secs',
    subTitle: 'Sample pickup at your home'
  },
  {
    title: 'Surgeries',
    img: img6,
    subTitle: 'Safe and trusted Surgery center'
  },
]

function UserHome() {

  const navigate=useNavigate()
  const handleClick=(item)=>{
console.log(item);
    if(item==='Find your nearest doctor'){
      navigate('/find-doctor')
    }

  }


  return (
    <Grid >
      <Container maxWidth="xl">
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mt: 7,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: 10,
            backgroundPosition: 'center',
            backgroundImage: `url(${imgBanner})`,
            minHeight: '500px',
          }}
        >
          {/* Increase the priority of the hero background image */}
          {<img style={{ display: 'none', borderRadius: '10px' }} src={imgBanner} alt="Banner" />}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,

            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                  paddingTop: '100px', // Adjust the padding from the top
                }}
              >
                {/* Your content */}
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          sx={{
            padding: 6,
            backgroundColor: 'transparant',
            color: '#fff',
            boxShadow: 'none',
            mt: '5'



          }}
        >
          <Grid container spacing={2} justifyContent="space-between" mt={2}   >
            {data.map((item) => (
              <Grid item xs={12} md={2} >
                <Card sx={{
                  maxWidth: 320,minHeight:350, borderRadius: '10px', cursor: 'pointer', transition: 'transform 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#ffff',
                    transition: 'transform 0.5s ease',
                  },
                }} boxShadow={25} onClick={() => handleClick(item.title)} >
                  <CardMedia
                    sx={{ width:'11rem', height:'10rem',textAlign:'center',marginLeft:'1rem' }}
                    backgroundColor='blue'
                    image={item.img}
                    
                    

                  />
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:550}}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.subTitle}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Grid>
  )
}

export default UserHome
