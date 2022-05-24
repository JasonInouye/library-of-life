import React from "react";
import { useDispatch } from 'react-redux';


/******* icon********/
import { VscTrash } from "react-icons/vsc";
import IconButton from '@mui/material/IconButton';




function DeleteButton({ video }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        console.log('clicked delete', video.id);
        // dispatch({ type: 'DELETE_VIDEO', payload: video.id });
        // dispatch({ type: 'CLEAR_VIDEOS' });
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