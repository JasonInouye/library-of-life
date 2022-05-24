import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayerComponent from '../_Widgets/ReactPlayerComponent';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteButton from '../_Widgets/DeleteButton';
import ShareDialogBox from '../_Widgets/ShareDialogBox';
import PermissionDropdown from '../_Widgets/PermissionDropdown';

import './VideoWatchPage.css'

/******* style/structure  ********/
import { Menu, Button, InputLabel, MenuItem, FormControl, Select, Container } from "@mui/material";


function VideoWatchPage() {

    const user = useSelector((store) => store.user);

    const singleVideo = useSelector((store) => store.videoReducer);

    const history = useHistory();


    //The database will replace this useState
    const [permission, setPermission] = useState('');

    const handleChange = (event) => {

        //Change to dispatch when hooked up to DB
        setPermission(event.target.value);
    };

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: 'GET_SINGLE_VIDEO' });
    }, []);

    const [menuPosition, setMenuPosition] = useState(null);

    const openShareMenu = (event) => {
        if (menuPosition) {
            return;
        }
        event.preventDefault();
        setMenuPosition({
            top: event.pageY,
            left: event.pageX
        });
    };

    const handleItemClick = () => {
        setMenuPosition(null);
    };

    const handleDelete = () => {
        dispatch({ type: 'DELETE_VIDEO', payload: singleVideo.id });
        dispatch({ type: 'CLEAR_VIDEOS' });
        // history.push(`/user`);
    };

    // console.log('single video url should be:', singleVideo.url);

    return (

        <Container
            className="videoWatch">

            {/* TODO replace with actual prompt? or hardcode for demo */}
            <h2>
                If you could do something to change humanity, what would it be?
            </h2>

            {/* TODO replace with actual video? or hardcode for demo */}
            <div id="video">
                <ReactPlayerComponent
                    videoURL={'https://d2qw0j2prooaok.cloudfront.net/1336144.mp4'}
                />
            </div>

            {/* TODO conditional render, since this
                page will be totally public
                QUESTION*PLUS* should we keep this totally off for the demo??

            <div>
                <PermissionDropdown
                    video={singleVideo} />

                <ShareDialogBox
                    video={singleVideo} />
            </div>

            <div>
                <DeleteButton
                    video={singleVideo} />

                
                
                <Button
                    variant='outlined'
                    color='primary'>
                    Back
                </Button> 
        </div>

        */}

        </Container >
    );
}







export default VideoWatchPage;