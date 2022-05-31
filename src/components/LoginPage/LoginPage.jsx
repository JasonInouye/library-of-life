import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {

  const history = useHistory();

  const goToLogin = () => {
    history.push('/login');
  }

  useEffect(() => {
    setTimeout(goToLogin, 500);
}, [])

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
