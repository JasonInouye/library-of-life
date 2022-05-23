import React from 'react'
import { useDispatch } from 'react-redux';

import { Fab } from '@mui/material';
import { VscEdit } from 'react-icons/vsc';


function ProfilePicButton({hover}) {

    const handleProfilePic = () => {
        console.log('clicked handleProfilePic');
        // TODO connect with dropzone? or other means of upload select
    }

    return (
        <Fab
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
        </Fab>
    )
}

export default ProfilePicButton




