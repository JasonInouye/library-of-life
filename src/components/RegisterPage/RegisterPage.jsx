import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button } from "@mui/material";
import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <img src='./images/backgrounds/faceMosaic.jpeg'
      className='backgroundImage'
      />

      <RegisterForm />

    </div>
  );
}

export default RegisterPage;
