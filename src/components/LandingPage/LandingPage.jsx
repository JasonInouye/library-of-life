import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Button from '@mui/material/Button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onRegistration = (event) => {
    history.push('/registration');
  };

  return (
    <div className="landing">
      <h2>Your Story. Your Legacy.</h2>
      <h5>--video goes here--</h5>
      <Button variant='outlined' onClick={onRegistration} sx={{ color: 'white', backgroundColor: 'black' }}>Join The Library Of Life</Button>

    </div>
  );
}

export default LandingPage;
