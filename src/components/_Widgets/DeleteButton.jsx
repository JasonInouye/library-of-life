import React from "react";
import { useDispatch } from 'react-redux';


/******* icon********/
import { VscTrash } from "react-icons/vsc";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';




function DeleteButton({ video }) {

    const dispatch = useDispatch();

    const handleDelete = (event) => {
        console.log('clicked DELETE')
        // TODO use delete route from WatchVideo
    }

    return (
        <>
            <IconButton aria-label="delete"
            onClick={handleDelete}
            style={{ marginRight: '1em', borderRadius:'50' }}>
                <VscTrash />
            </IconButton>

            {/* <Button
                size='small'
                color='error'
                variant="outlined"
                onClick={handleDelete}
            >
                Delete {<VscTrash style={{ paddingLeft: '2px' }} />}
            </Button> */}
        </>

    )
}

export default DeleteButton;