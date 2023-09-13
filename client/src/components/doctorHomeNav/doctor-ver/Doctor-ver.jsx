

import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonGroup from '@mui/material/ButtonGroup'
import { Button } from '@mui/material';
function DoctorVer(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}  sx={{ boxShadow: 'none', '&:hover': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
     }}>
      <CardActionArea component="a"  sx={{  boxShadow: 'none', '&:hover': {
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
         }}>
        <Card sx={{ display: 'flex', boxShadow: 'none', '&:hover': {
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
         }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {'Great Progress!'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {'Your profile is just few steps away from going live.'}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {'Doctor’s basic details, medical registration, education qualification, establishment details etc.'}
            </Typography>
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button>Click here</Button>
            </ButtonGroup>
            <Typography variant="subtitle1" color="text.secondary">
              {' Section B: Profile verification'}
            </Typography>
            <Typography variant="subtitle1" >
              {' Doctor identity proof, registration proof, establishment ownership proof etc'}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}



export default DoctorVer;