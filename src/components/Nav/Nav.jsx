import './Nav.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../_Widgets/LogOutButton';
import AutocompleteSearch from '../_Widgets/AutocompleteSearch';
import { IoIosArrowDown } from "react-icons/io";

/******* menu dropdowns  ********/
import { Menu, Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';


function Nav() {

  const user = useSelector((store) => store.user);
  const listOfUsers = useSelector(store => store.searchReducer.listOfUsers);

  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleItemClick = (menuLink) => {

    // console.log(menuLink);
    history.push(menuLink);

    setMenuPosition(null);
  };



  useEffect(() => {
    dispatch({ type: 'GET_USERS', payload: user })
  }, [user])

  return (
    <div className="nav">
      <div id='logo-link'>
        <Link to="/home">
          <img id='logo' src='/images/assets/logo.jpg' />
        </Link>

      </div>


      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <div className='navLinks'>
          <Button
            variant='outlined'
            size='small'
            sx={{ margin: '.5em' }}
            onClick={() => {
              history.push('/registration')}}
            >
            Register
          </Button>

          <Button
            variant='contained'
            size='small'
            sx={{ margin: '.5em' }}
            onClick={() => {
              history.push('/login')}}
            >
            Login
          </Button>
        </div>
      )}

      {/* If a user is logged in, show search */}
      {user.id && (
        <div id='search'>
          <AutocompleteSearch
            listOfUsers={listOfUsers}
          />
        </div>)}


      {/* If a user is logged in, show these links */}
      {user.id && (
        <div className='navLinks'>
          <div id='menu'>

            <Button
              variant='contained'
              size='small'
              onClick={openMenu}
              sx={{ margin: '.5em' }}>
              Menu <IoIosArrowDown />
            </Button>

            <Menu
              open={!!menuPosition}
              onClose={() => setMenuPosition(null)}
              anchorReference="anchorPosition"
              anchorPosition={menuPosition}>

              <MenuItem
                onClick={() => handleItemClick(`/user/${user.id}/videos`)}>
                My Profile
              </MenuItem>
              <br />

              <MenuItem
                onClick={() => handleItemClick(`/user/${user.id}/connections`)}>
                My Connections
              </MenuItem>
              <br />

              <MenuItem
                onClick={() => handleItemClick(`/manageLibrary`)}>
                Manage Library
              </MenuItem>
              <br />

              <MenuItem
                onClick={() => handleItemClick(`/user/${user.id}/uploads`)}>
                Upload Video
              </MenuItem>
              <br />

              <MenuItem
                onClick={() => handleItemClick('/about')}>
                About Library of Life
              </MenuItem>
            </Menu>
          </div>

          <LogOutButton />

        </div>
      )
      }

    </div >
  );
}

export default Nav;
