import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Connections.css';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { VscTrash } from "react-icons/vsc";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';

function Connections() {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connectionsReducer);

    const [toggle, setToggle] = React.useState('left');
    const [friends, setFriends] = useState(false);
    const [family, setFamily] = useState(false);
    const [requests, SetRequests] = useState(false);

    const handleToggle = (event, newToggle) => {
        setToggle(newToggle);
    };

    const handleFriends = () => {
        setFriends(true);
        setFamily(false);
        SetRequests(false);
    };

    const handleFamily = () => {
        setFriends(false);
        setFamily(true);
        SetRequests(false);
    };

    const handleRequests = () => {
        setFriends(false);
        setFamily(false);
        SetRequests(true);
    }

    const handleRemove = () => {
        dispatch({ type: 'DELETE_CONNECTIONS' });
        console.log('hi');
    }

    useEffect(() => {
        dispatch({ type: 'GET_CONNECTIONS' })
    }, []);


    return (
        <>
            <div className="toggleRight">
                <ToggleButtonGroup
                    value={toggle}
                    size="small"
                    exclusive
                    onChange={(event) => { handleToggle(event.target.value) }}
                    aria-label="connections">
                    <ToggleButton onClick={() => { handleFriends() }} value="friends" aria-label="left aligned">
                        <h3>Friends</h3>
                    </ToggleButton>
                    <ToggleButton onClick={() => { handleFamily() }} value="family" aria-label="centered">
                        <h3>Family</h3>
                    </ToggleButton>
                    <ToggleButton onClick={() => { handleRequests() }} value="requests" aria-label="right aligned">
                        <h3>Requests</h3>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <Box
                sx={{
                    // display: 'flex',
                    // flexWrap: 'wrap',
                    '& > :not(style)': {
                        // m: 1,
                        width: 350,
                        // height: 100,
                    },
                }}>

            {/* handle friends */}
                {friends && connections?.map((connect, i) => {
                    return (
                        <div key={i}>
                            {connect.relationship == "friend" &&
                                <ul>
                                    <Paper elevation={3}>
                                        <img className="connectionsImage" src={connect.profile_image} />
                                        <div className="connectionsName" >
                                            <li>{connect.first_name + " " + connect.last_name}</li>
                                        </div>
                                        <li className="connectionsRemove" onClick={() => handleRemove()}>remove</li>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}

            {/* handle family */}
                {family && connections?.map((connect, i) => {
                    return (
                        <div key={i}>
                                {connect.relationship == "family" &&
                                <ul>
                                    <Paper elevation={3}>
                                        <img className="connectionsImage" src={connect.profile_image} />
                                        <div className="connectionsName" >
                                            <li>{connect.first_name + " " + connect.last_name}</li>
                                        </div>
                                        <li className="connectionsRemove" onClick={() => handleRemove()}>remove</li>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}

                {/* {requests && } */}

            </Box>
        </>
    )
}

export default Connections;
