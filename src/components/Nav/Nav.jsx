import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';

import { Autocomplete, TextField } from '@mui/material';

/******* nested menu dropdowns  ********/
import { Menu, Button } from "@mui/material";
import NestedMenuItem from "material-ui-nested-menu-item";
import MenuItem from '@mui/material/MenuItem';

function Nav() {
  const user = useSelector((store) => store.user);
  const listOfUsers = useSelector(store => store.listOfUsers);

  const dispatch = useDispatch();
  const history = useHistory();


  //moved to stretch due to SQL queries
  // const handleSubmit = () => {
  //   history.push('/search-results');
  // }


  const [menuPosition, setMenuPosition] = useState(null);

  const openMenu = (event) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
  };

  const handleItemClick = () => {
    setMenuPosition(null);
  };



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


      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}


      <div id='search'>
        <Autocomplete
          id='users'
          options={listOfUsers}
          getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
          // onChange={handleExerciseInput}
          fullWidth
          // style={{ minWidth: 200, maxWidth: 200, width: 1000 }}
          renderInput={(params) => <TextField {...params} label='Search' />}
        />
      </div>


      {/* If a user is logged in, show these links */}
      {user.id && (
        <div id='navLinks'>
          <div id='menu'>
            <Link
              className="navLink"
              onClick={openMenu}>
              Menu
            </Link>
            <Menu
              open={!!menuPosition}
              onClose={() => setMenuPosition(null)}
              anchorReference="anchorPosition"
              anchorPosition={menuPosition}
            >
              <MenuItem onClick={handleItemClick}>My Profile</MenuItem>
              {/* <br /> */}
              <MenuItem onClick={handleItemClick}>My Connections</MenuItem>
              {/* <br /> */}
              <MenuItem onClick={handleItemClick}>About Library of Life</MenuItem>
            </Menu>
          </div>
          <LogOutButton className="navLink" />
        </div>
      )
      }

    </div >
  );
}

export default Nav;
