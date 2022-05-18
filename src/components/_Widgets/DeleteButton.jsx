import React from "react";
import { useDispatch } from 'react-redux';


/******* icon and button  ********/
import { VscTrash } from "react-icons/vsc";
import { Button } from "@mui/material";


function DeleteButton({ video }) {

    const dispatch = useDispatch();

    const handleDelete = (event) => {
        console.log('clicked DELETE');
    }

    return (
        <>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={handleDelete}>
                            <span style={{ marginTop: '5px' }}>
                                <VscTrash size={17} /></span>
                        </Button>
                    </>
                  
    )
}

export default DeleteButton;