import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { Fab } from '@mui/material';
import { VscEdit } from 'react-icons/vsc';


function ProfilePicButton() {

    const handleProfilePic = () => {
        console.log('clicked handleProfilePic');
        // TODO connect with dropzone? or other means of upload select
    }

    /*** controls render of 'edit photo' upon button hover ***/
    const handleMouseIn = () => {
        setHover(true);
    };

    const handleMouseOut = () => {
        setHover(false);
    };

    const [hover, setHover] = useState(false);

    /*** end conditional render controls ***/


    return (
        <Fab
            onMouseOver={handleMouseIn}
            onMouseOut={handleMouseOut}
            onClick={handleProfilePic}
            style={{
                position: 'absolute',
                left: '10.5em',
                top: '10em',
                color: 'gray',
            }}//this position MUST use 'style;' Does not work w 'sx'
            sx={{ borderRadius: '50% !important' }}
            //this borderRadius MUST use 'sx,' does not work w/ 'style'; otherwise square for some reason
            size='small'
        >
            {hover ? 'Edit photo' : <VscEdit />} 
            {/* 'edit photo' on hover, vs edit icon without hover*/}
        </Fab>
    )
}

export default ProfilePicButton




