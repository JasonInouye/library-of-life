import React, {useState} from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UserVideoItem from "../UserVideoItem/UserVideoItem";

/******* styling  ********/
import { Container, Grid } from '@mui/material';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';


function UserVideos() {

    const dispatch = useDispatch();

    const videos = useSelector((store) => store.videoReducer);
    const [toggle, setToggle] = React.useState('left');
    const [myVideos, setMyVideos] = useState(false);
    const [mySharedVideos, setSharedVideos] = useState(false);


    //console.log(' this is the video store ', videos)

    useEffect(() => {//triggers saga getting all user videos from DB on page load
        dispatch({ type: 'GET_USER_VIDEOS' });
    }, []);

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


    return (
        <>
            <Container>
                <ToggleButtonGroup
                    value={toggle}
                    color="primary"
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
                                    video={video} />
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default UserVideos;

