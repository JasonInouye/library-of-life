import React from 'react'
import { useDispatch } from 'react-redux';

import { Fab } from '@mui/material';
import { VscEdit } from 'react-icons/vsc';


function ProfilePicButton() {

const handleProfilePic = () => {
    console.log('clicked handleProfilePic');
    // TODO connect with dropzone? or other means of upload
}

    return (
        <Fab //FIXME make Fab round! what is overriding?
        onClick={handleProfilePic}   
        style={{
                position: 'absolute',
                left: '10.5em',
                top: '10em',
                color: 'gray',
            }}
            size='small'
            variant="outlined"
        >
            Edit Photo <VscEdit />
        </Fab>
    )
}

export default ProfilePicButton




