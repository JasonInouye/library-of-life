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
        <Fab 
        //FIXME make Fab round! what is overriding?! 
        //it's round (but wrong color) on "My Connections"
        onClick={handleProfilePic}   
        style={{
                position: 'absolute',
                left: '10.5em',
                top: '10em',
                color: 'gray',
                borderRadius:'50% !important'
            }}
            size='small'
            variant="outlined"
        >
        <VscEdit />
        </Fab>
    )
}

export default ProfilePicButton




