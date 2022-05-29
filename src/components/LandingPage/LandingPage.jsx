import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import ReactPlayerComponent from '../_Widgets/ReactPlayerComponent';

import { Button, Grid, Container } from '@mui/material';


function LandingPage() {

  const history = useHistory();

  const onRegistration = (event) => {
    history.push('/registration');
  };

  return (

    <Container>

      <Grid
        container
        spacing={1}
        direction={'column'}
        // justifyItems='center'
      >

        <Grid item>
          <h2
            className="border white">
            Your Story. Your Legacy.
          </h2>
        </Grid>

        <Grid 
        item xs={12} md={8}
        >
          <img src='./images/backgrounds/facetime.png'
          className='mainImage'/>
        </Grid>

        <Grid item>
          <Button
            variant='outlined'
            onClick={onRegistration}
          >
            Join The Library Of Life
          </Button>
        </Grid>

      </Grid>
    </Container>


  );
}

export default LandingPage;
