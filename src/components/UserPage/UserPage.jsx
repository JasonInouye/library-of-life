import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UserPage.css';
import { useDispatch, useSelector } from 'react-redux';
import UserVideos from '../UserVideos/UserVideos';
import Connections from '../Connections/Connections';
import VideoUploadPage from '../VideoUploadPage/VideoUploadPage';
import ProfilePicButton from '../_Widgets/ProfilePicButton';
import BannerDialog from '../_Widgets/BannerDialog';

/******* styling  ********/
import { Menu, Typography, Button, Fab } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';



function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();


  const user = useSelector((store) => store.user);
  const searchedUser = useSelector((store) => store.searchReducer.searchedUser);
  // const pendingStatus = useSelector((store) => store.connectionsReducer.pending);
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


  console.log('searchedUser status should be:', pendingStatus);

  useEffect(() => {
    dispatch({ type: 'GET_SEARCHED_USER', payload: userInParams })
  }, [userInParams])


  return (
    <div >
      <div className='profile-header'>
        <div >

          {
            userInParams == user.id ?
              <>
                <img className='bannerimage' src={user.banner_image}
                  alt='Banner image' />

                <BannerDialog />

                <div className='profile-img-div'>

                  <img className='profile-img' src={user.profile_image}
                    alt={`A picture of ${user.first_name}`} />

                  <div className='profilePicBtn'>
                    <ProfilePicButton />
                  </div>

                  {/* TODO attach to DB data */}
                  <div className='aboutMe'>
                    <Typography
                      variant='subtitle2'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat.
                    </Typography>
                  </div>

                </div>
              </>
              :
              <>
                <img className='bannerimage' src={searchedUser.banner_image}
                  alt='Banner image' />

                <div className='profile-img-div'>
                  <img className='profile-img' src={searchedUser.profile_image}
                    alt={`A picture of ${searchedUser.first_name}`} />
                </div>
              </>
          }
        </div>

        <div className='info-beneath-photos'>

          <div className='name-and-location'>
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
                      size="small"
                      variant="extended"
                      color="primary"
                      onClick={openRequestMenu}>
                      Connect with
                      {" " + searchedUser?.first_name?.charAt(0).toUpperCase()
                        + searchedUser?.first_name?.slice(1)}
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

          {userInParams == user.id && view == 'connections' &&
            <div className='profile-info'>
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

          {/* TODO this should be "shared with me" videos? 
          {view == "videos" &&
            <UserVideos />} */}

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
