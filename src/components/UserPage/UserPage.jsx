import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import UserVideos from '../UserVideos/UserVideos';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <div id='images'>
        <img src='' alt='background image' />
        <img src='' alt='a very good looking individual' />
      </div>
      <div>
        <div>
          <h1>Name</h1>
          <h2>Location</h2>
        </div>
        <div>
          <Button>Manage Library</Button>
          <Button>My Connections</Button>
        </div>
      </div>
      <UserVideos />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
