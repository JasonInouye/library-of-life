import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Button, Input} from "@mui/material";
import './EditProfile.css';

function EditProfile() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'UPDATE_REGISTER',
      payload: {
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        country: country
      },
    });
  }; // end registerUser

  return (

    <Box
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
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
      <form className="formPanel" onSubmit={registerUser}>

        <h2 className="center">Edit Information</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}

        <div>
          <label htmlFor="firstName">
            <Input
              placeholder="First Name" 
              type="text"
              name="firstName"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="Last Name">
            <Input
              placeholder="Last Name" 
              type="text"
              name="lastName"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            <Input
              placeholder="City" 
              type="text"
              name="city"
              value={city}
              required
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            <Input
              placeholder="State" 
              type="text"
              name="state"
              value={state}
              onChange={(event) => setState(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="country">
            <Input
              placeholder="Country" 
              type="text"
              name="country"
              value={country}
              required
              onChange={(event) => setCountry(event.target.value)}
            />
          </label>
        </div>

       <div className="centerRegister"> 
        <Button className="centerBtn" type="submit" name="submit" value="Register" variant='outlined'>
           Save
        </Button> 
        </div>
      </form>

    </Box>
  );
}

export default EditProfile;