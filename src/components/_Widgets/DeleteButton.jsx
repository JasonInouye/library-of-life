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
        <VscTrash 
        size={17} 
        onClick={handleDelete}
        style={{backgroundColor:'red', color:'white', borderRadius:'4px', 
        paddingRight:'2px', paddingLeft:'2px', margin:'3px', boxShadow:'1px 1px 4px #888888', cursor:'pointer',
        transition:'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;'}}/>
            {/* <Button
                style={{height:'20px'}}
                variant='contained'
                color='error'
                onClick={handleDelete}>
                <span >
                    <VscTrash size={17} style={{display:'block'}}/></span>
            </Button> */}
        </>

    )
}

export default DeleteButton;