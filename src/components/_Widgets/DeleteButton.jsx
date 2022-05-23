import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';


/******* icon********/
import { VscTrash } from "react-icons/vsc";
import IconButton from '@mui/material/IconButton';




function DeleteButton({ video }) {

    const dispatch = useDispatch();

    // const singleVideo = useSelector((store) => store.videoReducer);

    const history = useHistory();

    const handleDelete = () => {
        console.log('clicked');
        dispatch({ type: 'DELETE_VIDEO', payload: video.id });
        // dispatch({ type: 'CLEAR_VIDEO' });
        // history.push(`/user`);
    };



    return (
        <>
            <IconButton aria-label="delete"
            sx={{padding: '8px !important',
                borderRadius: '50% !important',
                color: 'rgba(0, 0, 0, 0.54) !important'}}
            onClick={handleDelete}
            style={{ marginRight: '1em'}}>
                <VscTrash />
            </IconButton>
        </>

    )
}

export default DeleteButton;