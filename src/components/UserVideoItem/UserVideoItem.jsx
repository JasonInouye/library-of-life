import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';



import React from "react";
import { Menu, Typography } from "@mui/material";

import NestedMenuItem from "material-ui-nested-menu-item";

function UserVideoItem() {

    //The database will replace this useState
    const [permission, setPermission] = useState('');

    const handleChange = (event: SelectChangeEvent) => {

        //Change to dispatch when hooked up to DB
        setPermission(event.target.value);
    };




    const [menuPosition, setMenuPosition] = useState(null);

  const handleRightClick = (event: React.MouseEvent) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
  };

  const handleItemClick = (event: React.MouseEvent) => {
    setMenuPosition(null);
  };


    return (
        <>
            <img />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="permission-select-small">Permissions</InputLabel>
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

            <div onContextMenu={handleRightClick}>
                <Typography>Right click to open menu</Typography>
                <Menu
                    open={!!menuPosition}
                    onClose={() => setMenuPosition(null)}
                    anchorReference="anchorPosition"
                    anchorPosition={menuPosition}
                >
                    <MenuItem onClick={handleItemClick}>Button 1</MenuItem>
                    <MenuItem onClick={handleItemClick}>Button 2</MenuItem>
                    <NestedMenuItem
                        label="Button 3"
                        parentMenuOpen={!!menuPosition}
                        onClick={handleItemClick}
                    >
                        <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
                        <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
                        <NestedMenuItem
                            label="Sub-Button 3"
                            parentMenuOpen={!!menuPosition}
                            onClick={handleItemClick}
                        >
                            <MenuItem onClick={handleItemClick}>Sub-Sub-Button 1</MenuItem>
                            <MenuItem onClick={handleItemClick}>Sub-Sub-Button 2</MenuItem>
                        </NestedMenuItem>
                    </NestedMenuItem>
                    <MenuItem onClick={handleItemClick}>Button 4</MenuItem>
                    <NestedMenuItem
                        label="Button 5"
                        parentMenuOpen={!!menuPosition}
                        onClick={handleItemClick}
                    >
                        <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
                        <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
                    </NestedMenuItem>
                </Menu>
            </div>
        </>
    )
}

export default UserVideoItem;