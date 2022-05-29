import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Input } from "@mui/material";
import './LoginForm.css';

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const moveToProfileVideos = () => {
    history.push('/user/videos');
  }

  const loginJane = () => {
    setUsername('janekim@lol.com');
    setPassword('1234');
  }

  const loginEddie = () => {
    setUsername('eddietanaka@lol.com');
    setPassword('1234');
  }

  const loginMay = () => {
    setUsername('mayirwin@lol.com');
    setPassword('1234');
  }

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
        callback: moveToProfileVideos
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    setUsername('');
    setPassword('');
  }; // end login

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className='loginFormBox'
      sx={{
        width: 300,
        height: 250,
        boxShadow: 3,
        marginLeft: 72,
        marginTop: 10,
        bgcolor: 'white'
      }}>

      <form className="formPanel" onSubmit={login}>

        <h2 className="center">
          <span onClick={loginJane}>L</span>
          o
          <span onClick={loginEddie}>g</span>
          i 
          <span onClick={loginMay}>n</span>
        </h2>

        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}

        <div>
          <label htmlFor="username">
            <Input
              placeholder="Email Address"
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            <Input
              placeholder="Password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>

        <div className="centerLogin">
          <Button 
          type="submit" 
          // name="submit" 
          // value="Log In" 
          variant="contained">
            Log In
          </Button>
        </div>

      </form>
    </Box>
  );
}

export default LoginForm;
