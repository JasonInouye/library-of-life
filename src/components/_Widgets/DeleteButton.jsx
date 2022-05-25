import React from "react";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

/******* icon********/
import { VscTrash } from "react-icons/vsc";
import IconButton from '@mui/material/IconButton';




function DeleteButton({ video }) {
    const dispatch = useDispatch();

    const handleDelete = (event) => {
        console.log('clicked delete', video);
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to delete this video?',
            text: 'The deletion of this video will be permanent.',
            showCancelButton: true,
          }).then((result) => {
              if (result.isConfirmed) {
                dispatch ({ type: 'DELETE_VIDEO', payload: video })
              }
          })
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