import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AppBar, Box, Button, ButtonGroup, Card, CardActionArea, CardContent, Container, Divider, List, ListItem, ListItemText, TextField, Toolbar, speedDialIconClasses } from '@mui/material';

import docBanner from '../../../assets/findDoctor.png';
import security from '../../../assets/security_1.webp';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setSerchKeyWords} from '../../../redux/searchDoctor'

function DoctorFind() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [location, setLocation] = React.useState('')
    const [speciality, setSpeciality] = React.useState('')

    const [suggestions, setSuggestions] = React.useState(new Array(10));
    const [specialitiez, setSpecialitySuggestions] = React.useState(new Array(10));
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
    const specialities = [
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
    const handleLocation = (e) => {
        const value = e.target.value
        setLocation(value)


    }
    const handleSpeciality = (e) => {
        const value = e.target.value
        setSpeciality(value)
        console.log(speciality);


    }

    const handleLocationSuggestion = (value) => {
        setLocation(value)
        setSuggestions(null)
    }
    const handleSpecialitySuggestion = (value) => {
        setSpeciality(value)
        setSpecialitySuggestions(null)
    }


    React.useEffect(() => {
        if (location) {
            const filteredCitySuggestions = cities.filter((suggestion) => {
                return suggestion.toLowerCase().includes(location.toLowerCase());
            })
            setSuggestions(filteredCitySuggestions);
        } else {
            setSuggestions(null)
        }

    }, [location])
    React.useEffect(() => {
        if (speciality) {
            const filteredSpecialitySuggestions = specialities.filter((suggestion) => {
                return suggestion.toLowerCase().includes(speciality.toLowerCase());
            })
            setSpecialitySuggestions(filteredSpecialitySuggestions);
        } else {
            setSpecialitySuggestions(null)
        }
    }, [speciality])
    React.useEffect(() => {
        const searchLocation=cities.includes(location)
        const searchSpeciality=specialities.includes(speciality)
       
        if(searchLocation && searchSpeciality){
            const data={location,speciality}
            dispatch(setSerchKeyWords(data))
            navigate('/doctor-book')
        }
    })
    return (
        <Box sx={{
            width: '100%',
        }}>
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'white',
                    color: '#fff',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    backgroundColor: 'rgba(41, 50, 141, 0.2)',
                    width: '100%',
                    minHeight: '500px',
                    justifyContent: 'center',
                    pt: '2px'
                }}
            >
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ zIndex: '1', height: '500px', }}

                >
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: { xs: 3, md: 6 },
                            }}
                        >
                            <Typography component="h1" variant="h2" color="inherit" gutterBottom>
                                {"Your home for health"}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {"find and book"}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Grid display={'flex'} flexDirection={'column'}>
                                    {/* Inputs */}
                                    <TextField
                                        id="filled-basic"
                                        label="Location"
                                        variant="filled"
                                        sx={{ backgroundColor: 'whitesmoke', width: 400 }}
                                        value={location}
                                        onChange={(e) => handleLocation(e)}
                                    />
                                    <List sx={{ position: 'absolute', top: '60%' }}>
                                        {suggestions && suggestions.map((suggestion, index) => (
                                            <ListItem key={index} sx={{ backgroundColor: 'whitesmoke', width: 400, cursor: 'pointer' }}>
                                                <ListItemText onClick={() => handleLocationSuggestion(suggestion)} secondary={suggestion} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid display={'flex'} flexDirection={'column'}>
                                    <TextField
                                        id="filled-basic"
                                        label="Speciality"
                                        variant="filled"
                                        value={speciality}
                                        onChange={(e) => handleSpeciality(e)}
                                        sx={{
                                            backgroundColor: 'whitesmoke',
                                            width: 400,
                                            marginLeft: 2, // Add some spacing between inputs
                                        }}
                                    />
                                    <List sx={{ position: 'absolute', top: '60%' }}>
                                        {specialitiez && specialitiez.map((suggestion, index) => (
                                            <ListItem key={index} sx={{ backgroundColor: 'whitesmoke', width: 400, cursor: 'pointer' }} >
                                                <ListItemText secondary={suggestion} onClick={() => handleSpecialitySuggestion(suggestion)} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '600px',
                        minHeight: '500px',
                        m: 0,
                        p: 0,
                        left: 0,
                        top: 0,
                        zIndex: '-10',
                    }}
                >

                    <img src={docBanner} alt="Img" style={{ width: '100%', height: '83%', objectFit: 'cover', position: 'sticky' }} />

                </Grid>
                <Grid
                    item xs={12} md={6}
                >
                    <AppBar
                        item xs={12} md={6}
                        position="static"
                        color="default"
                        elevation={0}
                        sx={{
                            backgroundColor: '#1D2968',
                            height: '90px',
                            color: '#fff',
                        }}

                    >
                        <Toolbar sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>

                            <Typography xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly', pl: '20rem', pr: '20rem', }}>
                                <Link variant="button" color="text.primary" href="#" sx={{ mx: 2 }}>
                                    Consult with a doctor
                                </Link>

                                <Link variant="button" color="text.primary" href="#" sx={{ mx: 2 }}>
                                    Order medicine
                                </Link>
                                <Link variant="button" color="text.primary" href="#" sx={{ mx: 2 }}>
                                    View Medical record
                                </Link>
                                <Link variant="button" color="text.primary" href="#" sx={{ mx: 2 }}>
                                    Book test
                                </Link>
                                <Button href="#" variant="outlined" sx={{ mx: 2 }}>
                                    Read article
                                </Button>
                            </Typography>

                        </Toolbar>
                    </AppBar>


                </Grid>

            </Paper>
            <Grid item xs={12} md={6} sx={{
                height: '50rem',
                justifyContent: 'start',
                flexDirection: 'row',
                width: '50rem'
            }}>
                <Box color="text.secondary"
                    sx={{
                        position: 'absolute',
                        left: '14rem',
                        top: '55rem',
                        display: 'flex',
                        flexDirection: 'column'

                    }}>
                    <Typography component="h2" variant="h4">
                        Safety of your data is our

                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                        top priority.
                    </Typography>
                    <Typography variant="h7" >
                        Multi-level security checks
                    </Typography>
                    <Typography variant="h7">
                        Multiple data backups
                    </Typography>
                    <Typography variant="h7" >
                        Stringent data privacy policies
                    </Typography>

                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        sx={{ marginTop: '5px' }}

                    >
                        <Button>Click here</Button>
                    </ButtonGroup>


                </Box>
                <Box sx={{
                    position: 'absolute',
                    left: '85rem',
                    top: '50rem'

                }}>
                    <img src={security} alt="" />
                </Box>

            </Grid>
        </Box>

    );
}

export default DoctorFind;
