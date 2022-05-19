import React from "react";
import { useDispatch } from 'react-redux';


/******* icon and button  ********/
import { VscTrash } from "react-icons/vsc";
import { Button } from "@mui/material";


function DeleteButton({ video }) {

    const dispatch = useDispatch();

    const handleDelete = (event) => {
        console.log('clicked DELETE')
        // TODO use delete route from WatchVideo
    }

    return (
        <>
            <Button
                style={{height:'20px'}}
                variant='contained'
                color='error'
                onClick={handleDelete}>
                <span >
                    <VscTrash size={17} style={{display:'block'}}/></span>
            </Button>
        </>

    )
}

export default DeleteButton;