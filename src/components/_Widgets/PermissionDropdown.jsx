import React from "react";
import { useState } from 'react';


/******* nested menu dropdowns  ********/
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function PermissionDropdown() {


    //The database will replace this useState
    const [permission, setPermission] = useState(0);

    const handleChange = (event) => {
        //Change to dispatch when hooked up to DB
        setPermission(event.target.value);
        console.log('selected permission is:', permission);
    };

    return (
        <>

            {/* permissions menu */}
            < FormControl sx={{ m: 1, minWidth: 180 }} size="small">
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
                    <MenuItem value={1}>Everyone</MenuItem>
                    <MenuItem value={2}>Friends</MenuItem>
                    <MenuItem value={3}>Family</MenuItem>
                    <MenuItem value={4}>Invite-Only</MenuItem>
                </Select>
            </FormControl>

        </>
    )
}

export default PermissionDropdown;