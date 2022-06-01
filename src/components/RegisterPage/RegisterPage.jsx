import './RegisterPage.css';
import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {

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
