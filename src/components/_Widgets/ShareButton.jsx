import React from "react";
import { useState } from 'react';


/******* icon  ********/
import { SiSlideshare } from "react-icons/si";

/******* nested menu dropdowns  ********/
import { Menu, Button } from "@mui/material";
import NestedMenuItem from "material-ui-nested-menu-item";
import MenuItem from '@mui/material/MenuItem';


function ShareButton() {


    //The database will replace this useState
    const [permission, setPermission] = useState('');

    const handleChange = (event) => {
        //Change to dispatch when hooked up to DB
        setPermission(event.target.value);
        console.log('selected permission is:', permission);
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
            <Button
                size="small"
                variant='contained'
                onClick={openShareMenu}
                style={{backgroundColor:'#667b68'}}>
                Share <span style={{ paddingLeft: '5px' }}><SiSlideshare /> </span>
            </Button>
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
        </>
    )
}

export default ShareButton;