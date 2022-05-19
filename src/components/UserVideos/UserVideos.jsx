
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UserVideoItem from "../UserVideoItem/UserVideoItem";
import Grid from '@material-ui/core/Grid';
import Container from '@mui/material/Container';


function UserVideos() {

    const dispatch = useDispatch();

    const videos = useSelector((store) => store.videoReducer);

    useEffect(() => {//triggers saga getting all user videos from DB on page load
        dispatch({ type: 'GET_USER_VIDEOS' });
    }, []);


    return (
        <>
         
            {videos?.map((video, i) => {
                return ( //loops thru array of videos to create each video item
                    <UserVideoItem
                        key={i}
                        video={video}
                    />
                )
            })}
        </>
    )
}

export default UserVideos;