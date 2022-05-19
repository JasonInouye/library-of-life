import React from "react";
import './UserVideoItem.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

/******* video player  ********/
import ReactPlayer from 'react-player';

/******* icons  ********/
import { VscTrash } from "react-icons/vsc";
import { SiSlideshare } from "react-icons/si";

/******* nested menu dropdowns  ********/
import { Menu, Typography, Button } from "@mui/material";
import NestedMenuItem from "material-ui-nested-menu-item";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/******* general MUI structure  ********/
import Container from '@mui/material/Container';


function UserVideoItem({ video }) {

    // check if user owns videos; don't render edit/delete buttons if not
    const user = useSelector((store) => store.user);


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
            <Container>
                <div id='video-item'>
                    {/* the video */}
                    <ReactPlayer
                        className='react-player'
                        width='75%'
                        height='75%'
                        url={video.url}
                        controls={true} />

                    {/* if logged-in user, show permissions toggle, delete, and share options*/}
                    {/* {user.id == video.user_id ? */}

                    <div id='permissions-and-share'>
                        <div id='permissions'>
                            {/* permissions menu */}
                            < FormControl sx={{ m: 1, minWidth: 180 }} size="small">
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
                        </div>

                        {/* share button */}
                        <div id='share'>
                            <Button
                                variant='contained'
                                onClick={openShareMenu}>
                                Share <span style={{ paddingLeft: '5px' }}><SiSlideshare /> </span>
                            </Button>
                            <Menu
                                open={!!menuPosition}
                                onClose={() => setMenuPosition(null)}
                                anchorReference="anchorPosition"
                                anchorPosition={menuPosition}
                            >
                                <MenuItem style={{ width: '100%' }} onClick={handleItemClick}>Everyone</MenuItem>
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
                                    <br />
                                </NestedMenuItem>
                                <MenuItem style={{ width: '100%' }} onClick={handleItemClick}>Link</MenuItem>
                            </Menu>
                            <Button
                                id='delete-button'
                                variant='contained'
                                color='error'>
                                <span style={{ marginTop: '5px' }}>
                                    <VscTrash size={17} /></span>
                            </Button>

                            {/* :
                             null} */}
                        </div>
                    </div >
                </div>
            </Container>
        </>
    )
}

export default UserVideoItem;