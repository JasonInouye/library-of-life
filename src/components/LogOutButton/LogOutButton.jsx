import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      variant='outlined'
      size='small'
      sx={{ margin: '.5em' }}
      onClick={() => dispatch({ type: 'LOGOUT' })}>
      Log Out
    </Button>
  );
}

export default LogOutButton;
