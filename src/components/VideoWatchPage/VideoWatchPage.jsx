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

/******* general MUI structure  ********/
import Container from '@mui/material/Container';

function VideoWatchPage() {




    return (
        <main className="sageBackground">
            <div className="videoWatch">
                <h2 className="border sage">If you could do something to change humanity, what would it be?</h2>
                <h5 className="sage">--video goes here--</h5>

                {/* <MenuItem value={4}>Everyone</MenuItem>
                    <MenuItem value={3}>Friends</MenuItem>
                    <MenuItem value={2}>Family</MenuItem>
                    <MenuItem value={1}>Invite-Only</MenuItem> */}
                <Button variant='outlined' sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Delete</Button>
                <Button variant='outlined' sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Share</Button>
                <Button variant='outlined' sx={{ margin: '20px', color: 'white', backgroundColor: '#667b68' }}>Back</Button>

        
            </div>
        </main>
    );
}







export default VideoWatchPage;