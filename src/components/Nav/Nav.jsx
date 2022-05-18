import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';

import { Autocomplete, TextField } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);
  const listOfUsers = useSelector(store => store.listOfUsers);

  const dispatch = useDispatch();
  const history = useHistory();


  //moved to stretch due to SQL queries
  // const handleSubmit = () => {
  //   history.push('/search-results');
  // }



  useEffect(() => {
    dispatch({ type: 'GET_USERS' })
  }, [])

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
              {/* <form onSubmit={handleSubmit}> */}
              <Autocomplete
                id='users'
                options={listOfUsers}
                getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
                // onChange={handleExerciseInput}
                style={{ width: 500 }}
                renderInput={(params) => <TextField {...params} label='Search' />}
              />
              {/* </form> */}
            </div>
            <div id='navLinks'>
              <Link className="navLink" to="/manageLibrary">
                Manage Library
              </Link>

              <Link className="navLink" to="/videoWatchPage">
                Video Watch Page
              </Link>

              <Link className="navLink" to="/about">
                About
              </Link>

              <LogOutButton className="navLink" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Nav;
