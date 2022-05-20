import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UserPage.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import UserVideos from '../UserVideos/UserVideos';
import Connections from '../Connections/Connections';

/******* nested menu dropdowns  ********/
import { Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';



function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();


  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const searchedUser = useSelector((store) => store.searchReducer.searchedUser);
  const view = useParams().view;
  const userInParams = Number(useParams().userInParams);

  const [menuPosition, setMenuPosition] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const openRequestMenu = (event) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
  };

  const handleFriendClick = () => {
    setMenuPosition(null);

    dispatch({ type: 'POST_REQUEST', payload: { relationship: 'Friend', userB: userInParams } })
  };

  const handleFamilyClick = () => {
    setMenuPosition(null);

    dispatch({ type: 'POST_REQUEST', payload: { relationship: 'Family', userB: userInParams } })
  };


  

  useEffect(() => {
    dispatch({ type: 'GET_SEARCHED_USER', payload: userInParams })
  }, [userInParams])

  return (
    <div className="container">
      <div id='profile-header'>
        <div id='images'>
          <img id='banner-img' src='https://marketplace.canva.com/EAENvp21inc/1/0/1600w/canva-simple-work-linkedin-banner-qt_TMRJF4m0.jpg' alt='banner image' />
          <div id='profile-img-div'>
            <img id='profile-img' src='https://annemariesegal.files.wordpress.com/2017/04/adobestock_116914002-cropped-young-woman-suit.jpg?w=300&h=295' alt='a very good looking individual' />
          </div>
        </div>
        <div id='info-beneath-photos'>
          <div id='name-and-location'>
            <h3>{searchedUser?.first_name?.charAt(0).toUpperCase() + searchedUser?.first_name?.slice(1) + ' ' + searchedUser?.last_name?.charAt(0).toUpperCase() + searchedUser?.last_name?.slice(1)}</h3>
            <h4>{searchedUser?.city?.charAt(0).toUpperCase() + searchedUser?.city?.slice(1) + ', ' + searchedUser?.state?.toUpperCase()}</h4>
            {userInParams != user.id &&
              <>
                <Button disabled={btnDisabled} onClick={openRequestMenu}>Request</Button>
                <Menu
                  open={!!menuPosition}
                  onClose={() => setMenuPosition(null)}
                  anchorReference="anchorPosition"
                  anchorPosition={menuPosition}
                >
                  <MenuItem style={{ width: '100%' }} onClick={() => {handleFriendClick()}}>Friend</MenuItem>
                  <MenuItem style={{ width: '100%' }} onClick={() => {handleFamilyClick()}}>Family</MenuItem>
                </Menu>
              </>}
          </div>
          {userInParams == user.id &&
            <div id='profile-info'>
              <Button
                id='manage-library'
                variant='outlined'
                onClick={() => { history.push('/managelibrary') }}>
                Manage Library</Button>
              <Button variant='outlined' onClick={() => { history.push('/user/connections') }}>My Connections</Button>
            </div>}
        </div>
      </div>

      {userInParams == user.id &&
        <>
          {view == "videos" &&
            <UserVideos />}

          {view == "connections" &&
            <Connections />}
        </>
      }

    </div>



  );
}

// this allows us to use <App /> in index.js
export default UserPage;
