import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UserVideoItem from '../UserVideoItem/UserVideoItem';

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Container from '@mui/material/Container';


// import classNames from 'classnames';

function ManageLibrary() {

    const dispatch = useDispatch();
    const videos = useSelector((store) => store.videoReducer);
    const history = useHistory();

    useEffect(() => {//triggers saga getting all user videos from DB on page load
        dispatch({ type: 'GET_USER_VIDEOS' });
    }, []);

    return (
        <>
            <Container>
                <Grid container
                    style={{ padding: '1em', textAlign: 'center' }}
                    spacing={3}>

                    <Grid item
                        xs={12} lg={6}>
                        <h1>Manage Library</h1>
                    </Grid>

                    {/* Map thru array of user's videos*/}
                    < Grid item xs={4} lg={4}>
                    {videos?.map((video) => {
                        return ( //loops thru array of videos to create each video item
                            <UserVideoItem
                                key={video.id}
                                video={video}
                            />);
                    })}
                    </Grid>
                    {/* < Grid item xs={4} lg={4}>
                        <UserVideoItem />
                    </Grid>

                    <Grid item xs={4} lg={4}>
                        <UserVideoItem />
                    </Grid>

                    <Grid item xs={4} lg={4}>
                        <UserVideoItem />
                    </Grid>

                    <Grid item xs={4} lg={4}>
                        <UserVideoItem />
                    </Grid>

                    <Grid item xs={4} lg={4}>
                        <UserVideoItem />
                    </Grid> */}

                </Grid>
            </Container>
        </>
    )
}

export default ManageLibrary