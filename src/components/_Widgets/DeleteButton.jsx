import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';


/******* icon and button  ********/
import { VscTrash } from "react-icons/vsc";
import { Button } from "@mui/material";


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
            <Button
                variant='contained'
                color='error'
                onClick={handleDelete}
                >
                <span style={{ marginTop: '5px' }}>
                    <VscTrash size={17} /></span>
            </Button>
        </>

    )
}

export default DeleteButton;