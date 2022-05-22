import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UserPage.css';
import { useDispatch, useSelector } from 'react-redux';
import UserVideos from '../UserVideos/UserVideos';
import Connections from '../Connections/Connections';
import VideoUploadPage from '../VideoUploadPage/VideoUploadPage';

/******* nested menu dropdowns  ********/
import { Menu, Typography, Button, Fab } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';



function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();


  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const searchedUser = useSelector((store) => store.searchReducer.searchedUser);
  const pendingStatus = useSelector((store) => store.pendingStatus);
  const view = useParams().view;
  const userInParams = Number(useParams().userInParams);

  const [menuPosition, setMenuPosition] = useState(null);
  // const [btnDisabled, setBtnDisabled] = useState(true);
  console.log('status', pendingStatus);

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

    dispatch({ type: 'POST_REQUEST', payload: { relationship: 'friend', userB: userInParams } })
  };

  const handleFamilyClick = () => {
    setMenuPosition(null);

    dispatch({ type: 'POST_REQUEST', payload: { relationship: 'family', userB: userInParams } })
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
            <Typography
              variant='h5'
              sx={{ fontFamily: "inherit" }}>
              {searchedUser?.first_name?.charAt(0).toUpperCase() +
                searchedUser?.first_name?.slice(1) + ' ' + searchedUser?.last_name?.charAt(0).toUpperCase()
                + searchedUser?.last_name?.slice(1)}
            </Typography>

            <Typography
              variant='h6'
              sx={{ fontFamily: "inherit" }}>
              {searchedUser?.city?.charAt(0).toUpperCase() +
                searchedUser?.city?.slice(1) + ', ' + searchedUser?.state?.toUpperCase()}
            </Typography>

            {userInParams != user.id &&
              <>
                {pendingStatus == false &&
                  <>
                    <Fab
                      variant="extended"
                      color="primary"
                      onClick={openRequestMenu}>
                      Connect with
                      {" " + searchedUser?.first_name?.charAt(0).toUpperCase()
                        + searchedUser?.first_name?.slice(1)}
                    </Fab>

                    <Fab
                      variant="extended"
                      onClick={openRequestMenu}>
                      Connect
                    </Fab>
                  </>
                }



                {pendingStatus == true &&
                  <Fab
                    variant="extended"
                    disabled>
                    Pending
                  </Fab>}

                <Menu
                  open={!!menuPosition}
                  onClose={() => setMenuPosition(null)}
                  anchorReference="anchorPosition"
                  anchorPosition={menuPosition}
                >
                  <MenuItem
                    style={{ width: '100%' }}
                    onClick={() => { handleFriendClick() }}>
                    Connect as Friends
                  </MenuItem>

                  <MenuItem
                    style={{ width: '100%' }}
                    onClick={() => { handleFamilyClick() }}>
                    Connect as Family
                  </MenuItem>
                </Menu>
              </>}
          </div>
          {userInParams == user.id && view == 'videos' &&

            <div id='profile-info'>
              <Button
                id='manage-library'
                variant='outlined'
                onClick={() => { history.push('/managelibrary') }}>
                Manage Library</Button>
              <Button
                variant='outlined'
                onClick={() => { history.push(`/user/${user.id}/connections`) }}>
                My Connections
              </Button>
              
            </div>}

            <Fab
                variant="extended">
                test fab
              </Fab>

          {userInParams == user.id && view == 'connections' &&
            <div id='profile-info'>
              <Button
                variant='outlined'
                onClick={() => { history.push(`/user/${user.id}/videos`) }}>
                My Videos
              </Button>
            </div>}

        </div>
      </div>

      {
        userInParams == user.id &&
        <>
          {view == "videos" &&
            <UserVideos />}

          {view == "videos" &&
            <UserVideos />}

          {view == "connections" &&
            <Connections />}

          {view == "uploads" &&
            <VideoUploadPage />}


        </>

      }
    </div >
  )
}


// this allows us to use <App /> in index.js
export default UserPage;
