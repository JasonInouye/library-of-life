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
    <main className="faces">
    <div className="landing">
      <h2 className="border white">Your Story. Your Legacy.</h2>
      <h5 className="white">--video goes here--</h5>
      <Button variant='outlined' onClick={onRegistration} sx={{ margin: '20px', color: 'black', backgroundColor: 'white' }}>Join The Library Of Life</Button>
    </div>
    </main>
  );
}

export default LandingPage;
