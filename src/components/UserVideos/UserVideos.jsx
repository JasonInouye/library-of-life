import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import UserVideoItem from "../UserVideoItem/UserVideoItem";

/******* styling  ********/
import { Container, Grid } from '@mui/material';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';


function UserVideos({ relationship }) {

    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);
    const videos = useSelector((store) => store.videoReducer);
    const sharedVideos = useSelector((store) => store.shareReducer.sharedVideos)
    const [toggle, setToggle] = React.useState('left');
    const [myVideos, setMyVideos] = useState(true);
    const [mySharedVideos, setSharedVideos] = useState(false);
    
    // console.log("In UserVideos", sharedVideos);

    const userInParams = Number(useParams().userInParams);

    // console.log(' this is the share reducer ', sharedVideos)


    const handleToggle = (event, newToggle) => {
        setToggle(newToggle);
    };

    const handleMyVideos = () => {
        setMyVideos(true);
        setSharedVideos(false);
    }

    const handleSharedVideos = () => {
        setMyVideos(false);
        setSharedVideos(true);
    }



    useEffect(() => {//triggers saga getting all user videos from DB on page load
        if (user.id == userInParams) {
            dispatch({ type: 'GET_USER_VIDEOS' });
        } else {
            dispatch({ type: 'GET_SEARCHED_USER_VIDEOS', payload: userInParams })
        }
    }, []);

    useEffect(() => {
            dispatch({ type: 'GET_SHARED_VIDEOS' });
    }, []);


    return (
        <>
            <Container>
                <div className="moveRight">
                    <ToggleButtonGroup
                        value={toggle}
                        className="videoToggle"
                        size="small"
                        exclusive
                        onChange={(event) => { handleToggle(event.target.value) }}
                        aria-label="connections">
                        <ToggleButton onClick={() => { handleMyVideos() }} value="myVideos" aria-label="myVideos">
                            <h3>My Videos</h3>
                        </ToggleButton>

                        <ToggleButton onClick={() => { handleSharedVideos() }} value="sharedVideos" aria-label="sharedVideos">
                            <h3>Shared Videos</h3>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>


                {myVideos &&
                    <Grid container
                        style={{ padding: '1em', textAlign: 'center' }}
                        spacing={1}>

                        {videos?.map((video, i) => {
                            return ( //loops thru array of videos to create each video item
                                < Grid
                                    item xs={12} md={4}
                                    key={video.id}>

                                    <UserVideoItem
                                        key={i}
                                        video={video}
                                        relationship={relationship} />
                                </Grid>)
                        })}
                    </Grid>
                }

                {mySharedVideos &&
                    <Grid container
                        style={{ padding: '1em', textAlign: 'center' }}
                        spacing={1}>

                        {sharedVideos?.map((video, i) => {
                            return ( //loops thru array of videos to create each video item
                                < Grid
                                    item xs={12} md={4}
                                    key={video.id}>

                                    <UserVideoItem
                                        key={i}
                                        video={video}
                                        relationship={relationship} />
                                </Grid>)
                        })}
                    </Grid>
                }
            </Container>
        </>
    )
}

export default UserVideos;

