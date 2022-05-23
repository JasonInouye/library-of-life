import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



/******* nested menu dropdowns  ********/
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function PermissionDropdown() {

    const dispatch = useDispatch();
    const currentPermission = useSelector((store) => store.permission);
    //TODO above: what is logic (/query) to figure out current permission setting??
    //TODO set drop down to show current settings (currentPermission from store) 
    //QUESTION what to show when invite-only?? a list with radio buttons of authorized people?


    //The database will replace this useState 
    const [permission, setPermission] = useState(''); //default in DB is invite-only
    

    const handleChange = (event) => {
        //Change to dispatch when hooked up to DB
        setPermission(event.target.value);
        dispatch({type: 'UPDATE_PERMISSION', payload: event.target.value})
    };
    
    console.log('selected permission is:', permission);

    return (
        <>
            < FormControl sx={{ m: 1, minWidth: '11em' }} size="small">
                <InputLabel id="permission-select-small">
                    Who can see this?
                </InputLabel>
                <Select
                    labelId="permission-select-small"
                    id="permission-select-small"
                    value={permission}
                    label="permission"
                    onChange={handleChange}
                >
                    <MenuItem value={'everyone'}>Everyone</MenuItem>
                    <br/>
                    <MenuItem value={'friends'}>Friends</MenuItem>
                    <br/>
                    <MenuItem value={'family'}>Family</MenuItem>
                    <br/>
                    <MenuItem value={'invite-only'}>Invite-Only</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default PermissionDropdown;