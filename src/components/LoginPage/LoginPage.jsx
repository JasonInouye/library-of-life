import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from "@mui/material";
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center className="centerRegister">
        <Button
          variant="outlined"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
