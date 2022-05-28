import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import {useHistory} from 'react-router-dom'

function LogOutButton(props) {
  const history = useHistory ();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Button
      variant='outlined'
      size='small'
      sx={{ margin: '.5em' }}
      onClick={handleLogout}
      >
      Log Out
    </Button>
  );
}

export default LogOutButton;
