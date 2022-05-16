import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';



import React from "react";
import { Menu, Typography, Button } from "@mui/material";

import NestedMenuItem from "material-ui-nested-menu-item";

function UserVideoItem() {

    //The database will replace this useState
    const [permission, setPermission] = useState('');

    const handleChange = (event) => {

        //Change to dispatch when hooked up to DB
        setPermission(event.target.value);
    };




    const [menuPosition, setMenuPosition] = useState(null);

    const openShareMenu = (event) => {
        if (menuPosition) {
            return;
        }
        event.preventDefault();
        setMenuPosition({
            top: event.pageY,
            left: event.pageX
        });
    };

    const handleItemClick = () => {
        setMenuPosition(null);
    };


    return (
        <>
            <img />

            <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="permission-select-small">Who can see this?</InputLabel>
                <Select
                    labelId="permission-select-small"
                    id="permission-select-small"
                    value={permission}
                    label="permission"
                    onChange={handleChange}
                >
                    <MenuItem value={4}>Everyone</MenuItem>
                    <MenuItem value={3}>Friends</MenuItem>
                    <MenuItem value={2}>Family</MenuItem>
                    <MenuItem value={1}>Invite-Only</MenuItem>
                </Select>
            </FormControl>

            <div id='share'>
                <Button variant='contained' onClick={openShareMenu}>Share</Button>
                <Menu
                    open={!!menuPosition}
                    onClose={() => setMenuPosition(null)}
                    anchorReference="anchorPosition"
                    anchorPosition={menuPosition}
                >
                    <NestedMenuItem
                        label="Friends"
                        parentMenuOpen={!!menuPosition}
                        onClick={handleItemClick}
                    >
                        <MenuItem onClick={handleItemClick}>All Friends</MenuItem>
                        <br />
                        <MenuItem onClick={handleItemClick}>Dave</MenuItem>
                    </NestedMenuItem>
                    <NestedMenuItem
                        label="Family"
                        parentMenuOpen={!!menuPosition}
                        onClick={handleItemClick}
                    >
                        <MenuItem onClick={handleItemClick}>All Family</MenuItem>
                        <br />
                        <MenuItem onClick={handleItemClick}>Mom</MenuItem>
                    </NestedMenuItem>
                </Menu>
            </div >
        </>
    )
}

export default UserVideoItem;