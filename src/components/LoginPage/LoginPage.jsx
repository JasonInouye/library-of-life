import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';

function LoginPage() {

  return (
    <div>
      <img src='./images/backgrounds/faceMosaic.jpeg'
      className='backgroundImage'
      />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
