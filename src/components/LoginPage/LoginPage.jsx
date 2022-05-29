import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';

function LoginPage() {

  return (
    <div>
      <img src='./images/backgrounds/faces-transparent.png'
      className='backgroundImage'
      />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
