import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Menu, Typography } from "@mui/material";
import NestedMenuItem from "material-ui-nested-menu-item";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { VscTrash } from "react-icons/vsc";
import { SiSlideshare } from "react-icons/si";
import ReactPlayer from 'react-player';

/******* general MUI structure  ********/
import Container from '@mui/material/Container';

function VideoWatchPage() {

    const user = useSelector((store) => store.user);

    const singleVideo = useSelector((store) => store.videoReducer);

    const history = useHistory();


    //The database will replace this useState
    const [permission, setPermission] = useState('');

    const handleChange = (event) => {

        //Change to dispatch when hooked up to DB
        setPermission(event.target.value);
    };

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: 'GET_SINGLE_VIDEO' });
    }, []);

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

    const handleDelete = () => {
        dispatch({ type: 'DELETE_VIDEO', payload: singleVideo.id });
        dispatch({ type: 'CLEAR_VIDEOS' });
        // history.push(`/user`);
    };


    return (
        <main className="sageBackground">
            <div className="videoWatch">
                <h2 className="border sage">If you could do something to change humanity, what would it be?</h2>
                <ReactPlayer
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={singleVideo.url}
                    controls={true} />


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
                    <Button
                        variant='contained'
                        color='error'>
                        <span style={{ marginTop: '5px' }}>
                            <VscTrash size={17} /></span>
                    </Button>

                    {/* :
                null} */}

                </div >


                <Button variant='outlined' onClick={handleDelete} sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Delete</Button>
                <Button variant='outlined' sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Share</Button>
                <Button variant='outlined' sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Back</Button>


            </div>
        </main>
    );
}







export default VideoWatchPage;