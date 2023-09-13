import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button } from '@mui/material';
import bg1 from '../../../assets/doctor.jpg'
import { MarginOutlined } from '@mui/icons-material';

export default function PatientDetails(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6} sx={{ height: 60 }}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>

          <Box
            sx={{
              width: '12%', 
              height: '7%', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'baseline',
              m: 2,
              p:4, // Add padding
              backgroundColor: '#F0F5F5', // Add background color
              borderRadius: 4, // Add border radius
            }}
          >
            <Typography component="h1" variant="h4" color="text.primary" sx={{font:'bold',ml:2}}>
              {'01'}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Jan
            </Typography>
          </Box>


          <CardContent sx={{ flex: 1,display:'flex',flexDirection:'column',justifyContent:'center' }}>
            <Typography component="h2" variant="h5">
              {'title'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {'10/10/1995'}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {'description'}
            </Typography>
          </CardContent>
          <Grid margin={2} display={'flex'} alignItems={'center'}>
        <Button variant='outlined'>Confirm</Button>
      </Grid>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={bg1}
            alt={'post.imageLabel'}
          />
       
        </Card>
        
      </CardActionArea>
      
    </Grid>
  );
}