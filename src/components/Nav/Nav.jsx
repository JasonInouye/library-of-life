import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import { Autocomplete, TextField } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div id='logo-link'>
        <Link to="/home">
          <img id='logo' src='/images/logo.jpg' />
        </Link>
      </div>
      <div>


        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <div id='logged-in-nav'>
            <div id='search'>
              <Autocomplete
                id='exercise-options'
                // options={exercises}
                // getOptionLabel={(option) => option.exercise_name}
                // onChange={handleExerciseInput}
                style={{ width: 500 }}
                renderInput={(params) => <TextField {...params} label='Search' />}
              />
            </div>
            <div id='navLinks'>
              <Link className="navLink" to="/user">
                Manage Library
              </Link>

              <Link className="navLink" to="/info">
                Info Page
              </Link>

              <LogOutButton className="navLink" />
            </div>
          </div>
        )}

        {/* <Link className="navLink" to="/about">
            About
          </Link> */}
      </div>
    </div>
  );
}

export default Nav;
