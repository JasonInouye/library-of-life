// Imports
import React from 'react';
import { useHistory } from 'react-router-dom';

// Styling
import './LandingPage.css';
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
            className='focalImage' />
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
