import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


/******* nested menu dropdowns  ********/
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function PermissionDropdown({ video }) {

    const dispatch = useDispatch();
    const currentPermission = useSelector((store) => store.permission);

    const handleChange = (event) => {
        dispatch({ type: 'UPDATE_PERMISSION', payload: { video_id: video.id, permission: event.target.value } });
    };

    // console.log('selected permission is:', permission);

    return (
        <>
            < FormControl sx={{ m: 1, minWidth: '11em' }} size="small">
                <InputLabel id="permission-select-small">
                    Who can see this?
                </InputLabel>

                <Select
                    labelId="permission-select-small"
                    id="permission-select-small"
                    value={video.permission}
                    label="permission"
                    onChange={handleChange}
                >
                    <MenuItem value={'everyone'}>Everyone</MenuItem>
                    <br />
                    <MenuItem value={'friend'}>Friends</MenuItem>
                    <br />
                    <MenuItem value={'family'}>Family</MenuItem>
                    <br />
                    <MenuItem value={'invite-only'}>Invite-Only</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default PermissionDropdown;