import React from 'react';
import './UserPage.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import UserVideos from '../UserVideos/UserVideos';
import { useHistory } from 'react-router-dom';



function UserPage() {
  const history = useHistory();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <div id='images'>
        <img id='banner-img' src='https://marketplace.canva.com/EAENvp21inc/1/0/1600w/canva-simple-work-linkedin-banner-qt_TMRJF4m0.jpg' alt='banner image' />
        <img id='profile-img' src='https://annemariesegal.files.wordpress.com/2017/04/adobestock_116914002-cropped-young-woman-suit.jpg?w=300&h=295' alt='a very good looking individual' />
        <div id='name-and-location'>
          <h1>Name</h1>
          <h2>Location</h2>
        </div>
      </div>
      <div id='profile-info'>
        {/* <div id='name-and-location'>
          <h1>Name</h1>
          <h2>Location</h2>
        </div> */}
        <div id='profile-links'>
          <Button 
          id='manage-library' 
          variant='outlined'
          onClick={() => { history.push('/managelibrary') }}>
            Manage Library</Button>
          <Button variant='outlined'>My Connections</Button>
        </div>
      </div>
      <UserVideos />
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
