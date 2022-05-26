import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Fab } from '@mui/material';
import { VscEdit } from 'react-icons/vsc';


function ProfileEditButton() {
    const user = useSelector((store) => store.user);
    const history = useHistory();

    const handleEditProfile = () => {
        console.log('clicked handleEditProfile', user);
        history.push(`/edit/${user.id}`);
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
        /*  
        this border-radius MUST use 'sx,' 
        does not work w/ 'style' on in CSS; 
        otherwise square for some reason
        */
        <Fab
            onMouseOver={handleMouseIn}
            onMouseOut={handleMouseOut}
            onClick={handleEditProfile}
            size='small'
            sx={{ borderRadius: '50% !important' }}
        >
            {hover ? 'Edit profile' : <VscEdit />}
            {/* 'edit photo' on hover, vs edit icon without hover*/}
        </Fab>
    )
}

export default ProfileEditButton




