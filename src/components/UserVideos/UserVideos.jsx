
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import UserVideoItem from "../UserVideoItem/UserVideoItem";

/******* styling  ********/
import { Container, Grid } from '@mui/material';


function UserVideos({ relationship }) {

    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);
    const videos = useSelector((store) => store.videoReducer);
    // const searchedUserVideos = useSelector((store) => store.searchedUserVideos)

    const userInParams = Number(useParams().userInParams);

    //console.log(' this is the video store ', videos)

    useEffect(() => {//triggers saga getting all user videos from DB on page load
        if (user.id == userInParams) {
            dispatch({ type: 'GET_USER_VIDEOS' });
        } else {
            dispatch({ type: 'GET_SEARCHED_USER_VIDEOS', payload: userInParams})
        }
    }, []);


    return (
        <>
            <Container>
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
            </Container>
        </>
    )
}

export default UserVideos;

