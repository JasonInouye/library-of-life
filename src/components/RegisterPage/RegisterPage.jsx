import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button } from "@mui/material";
import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <div className="centerLogin">
        <Button
          variant="outlined"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default RegisterPage;
