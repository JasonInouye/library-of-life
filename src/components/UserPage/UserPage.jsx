import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UserPage.css';
import { useDispatch, useSelector } from 'react-redux';
import UserVideos from '../UserVideos/UserVideos';
import Connections from '../Connections/Connections';
import VideoUploadPage from '../VideoUploadPage/VideoUploadPage';
import ProfilePicButton from '../_Widgets/ProfilePicButton';
import BannerDialog from '../_Widgets/Banner/BannerDialog';

/******* styling  ********/
import { Menu, Typography, Button, Fab } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();


  const user = useSelector((store) => store.user);
  const searchedUser = useSelector((store) => store.searchReducer?.searchedUser);
  const connections = useSelector((store) => store.connectionsReducer);
  const pendingStatus = useSelector((store) => store.pendingStatus);
  const view = useParams().view;
  const userInParams = Number(useParams().userInParams);

  const [menuPosition, setMenuPosition] = useState(null);
  const [relationshipWithConnection, setRelationshipWithConnection] = useState('');

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

  useEffect(() => {
    for (const connection of connections) {
      if ((connection.user_A_id == user.id && connection.user_B_id == userInParams && connection.pending == false) ||
        (connection.user_B_id == user.id && connection.user_A_id == userInParams && connection.pending == false)) {
        setRelationshipWithConnection(connection.relationship)
      }
    }
  }, [connections])


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

                  <div className='aboutMe'>
                    <Typography
                      variant='subtitle2'>
                      {user.about_me}
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

                <div className='searchAboutMe'>
                  <Typography
                    variant='subtitle2'>
                    {searchedUser.about_me}
                  </Typography>
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
                {pendingStatus?.pending == undefined &&
                  <Fab
                    size="small"
                    variant="extended"
                    color="primary"
                    onClick={openRequestMenu}>
                    Connect with
                    {" " + searchedUser?.first_name?.charAt(0).toUpperCase()
                      + searchedUser?.first_name?.slice(1)}
                  </Fab>
                }
                {pendingStatus?.pending == false &&
                  <>
                    {pendingStatus?.relationship &&
                      <h3>
                        {pendingStatus?.relationship?.charAt(0).toUpperCase()
                          + pendingStatus?.relationship?.slice(1)}
                      </h3>
                    }
                  </>
                }
                {pendingStatus?.pending == true &&
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
                My Profile
              </Button>
            </div>}

        </div>
      </div>

      {
        userInParams == user.id &&
        <>
          {view == "videos" &&
            <UserVideos relationship='self' />}

          {/* TODO this should be "shared with me" videos? 
          {view == "videos" &&
            <UserVideos />} */}

          {view == "connections" &&
            <Connections />}

          {view == "uploads" &&
            <VideoUploadPage />}
        </>
      }

      {
        userInParams != user.id &&
        <>
          <UserVideos relationship={relationshipWithConnection} />
        </>
      }
    </div >
  )
}


// this allows us to use <App /> in index.js
export default UserPage;
