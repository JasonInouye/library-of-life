import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Input, Box, TextField } from '@mui/material';
import './EditProfile.css';
import PhotoUploader from './PhotoUploader';
//import { user } from 'pg/lib/defaults';

function EditProfile() {
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [country, setCountry] = useState(user.country);
  const [password, setPassword] = useState('');

  const updateUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        country: country,
        id: user.id,
      },
    });
    window.location.reload();
  }; // end registerUser

  return (
    <Box
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
      // sx={{
      //   width: 300,
      //   height: 400,
      //   boxShadow: 3,
      //   marginLeft: 72,
      //   marginTop: 10,
      //   bgcolor: 'white'
      // }}
    >
      <form className='formPanel' onSubmit={updateUser}>
        <h2 className='center'>Edit Information</h2>
        {errors.registrationMessage && (
          <h3 className='alert' role='alert'>
            {errors.registrationMessage}
          </h3>
        )}

        <div>
          <label htmlFor='firstName'>
            <Input
              placeholder='First Name'
              type='text'
              name='firstName'
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='Last Name'>
            <Input
              placeholder='Last Name'
              type='text'
              name='lastName'
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='password'>
            <Input
              placeholder='City'
              type='text'
              name='city'
              value={city}
              required
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='password'>
            <Input
              placeholder='State'
              type='text'
              name='state'
              value={state}
              onChange={(event) => setState(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='country'>
            <Input
              placeholder='Country'
              type='text'
              name='country'
              value={country}
              required
              onChange={(event) => setCountry(event.target.value)}
            />
          </label>
        </div>

        <div className='centerRegister'>
          <PhotoUploader />
          <Button
            className='centerBtn'
            type='submit'
            name='submit'
            value='Register'
            variant='outlined'
          >
            Save
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default EditProfile;
