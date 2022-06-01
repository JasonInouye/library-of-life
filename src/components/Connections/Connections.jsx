// imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { number } from 'prop-types';

// styling
import './Connections.css';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

function Connections() {

    const dispatch = useDispatch();

    const connections = useSelector((store) => store.connectionsReducer);
    const user = useSelector((store) => store.user);
    
    const [toggle, setToggle] = React.useState('left');
    const [all, setAll] = useState(true);
    const [friends, setFriends] = useState(false);
    const [family, setFamily] = useState(false);
    const [requests, setRequests] = useState(false);
    const [numberOfRequests, setNumberOfRequests] = useState(0);

    const handleToggle = (event, newToggle) => {
        setToggle(newToggle);
    };

    const handleAll = () => {
        setAll(true);
        setFriends(false);
        setFamily(false);
        setRequests(false);
    }

    const handleFriends = () => {
        setAll(false);
        setFriends(true);
        setFamily(false);
        setRequests(false);
    };

    const handleFamily = () => {
        setAll(false);
        setFriends(false);
        setFamily(true);
        setRequests(false);
    };

    const handleRequests = () => {
        setAll(false);
        setFriends(false);
        setFamily(false);
        setRequests(true);
    }

    const handleRemove = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to remove this connection?',
            text: 'The removal of this friend will be permanent.',
            showCancelButton: true,
        }).then((result => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_CONNECTIONS', payload: id });
            }
        }))
    }

    const handleAccept = (id) => {
        dispatch({ type: 'ACCEPT_CONNECTIONS', payload: id });
    } 

    //on change get connections 
    useEffect(() => {
        dispatch({ type: 'GET_CONNECTIONS' })
    }, []);

    //on change of connections increase requests
    useEffect(() => {
        let temporaryNumberOfRequests = 0;

        for (const connection of connections) {
            if ((connection.pending == true) && (user.id == connection.user_B_id)) {
                temporaryNumberOfRequests++;
            }
        }
        setNumberOfRequests(temporaryNumberOfRequests);
    }, [connections])


    return (
        <>
            {/* toggle button styling */}
            <Box
                sx={{
                    borderRadius: 2,
                    m: 10
                }}
            >
                {/* toggle functionality */}
                <div className="toggleRight">
                    <ToggleButtonGroup
                        value={toggle}
                        color="primary"
                        size="small"
                        exclusive
                        onChange={(event) => { handleToggle(event.target.value) }}
                        aria-label="connections">
                        <ToggleButton onClick={() => { handleAll() }} value="friends" aria-label="friends">
                            <h3>All</h3>
                        </ToggleButton>

                        <ToggleButton onClick={() => { handleFriends() }} value="friends" aria-label="friends">
                            <h3>Friends</h3>
                        </ToggleButton>

                        <ToggleButton onClick={() => { handleFamily() }} value="family" aria-label="family">
                            <h3>Family</h3>
                        </ToggleButton>

                        <ToggleButton onClick={() => { handleRequests() }} value="requests" aria-label="requests">
                            <Stack spacing={2} direction="row">
                                <Badge badgeContent={numberOfRequests} color="secondary">
                                    <h3>Requests</h3>
                                </Badge>
                            </Stack>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Box>
            
            {/* connections paper styling */}
            <Box
                sx={{
                    '& > :not(style)': {
                        width: 350,
                    },
                }}>

                {/* map through both family and friend connections and display*/}
                {all && connections?.map((connect, i) => {
                    return (
                        <div key={i}>
                            {((connect.relationship == "friend" || "family") && connect.pending == false) &&
                                <ul>
                                    <Paper elevation={3}>
                                        <img className="connectionsImage" src={connect.profile_image} />
                                        <div className="connectionsName" >
                                            <li>{connect.first_name + " " + connect.last_name}</li>
                                        </div>
                                        <li className="connectionsRemove" onClick={() => handleRemove(connect.connection_id)}>Remove</li>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}

                {/* map through friends and display */}
                {friends && connections?.map((connect, i) => {
                    return (
                        <div key={i}>
                            {(connect.relationship == "friend" && connect.pending == false) &&
                                <ul>
                                    <Paper elevation={3}>
                                        <img className="connectionsImage" src={connect.profile_image} />
                                        <div className="connectionsName" >
                                            <li>{connect.first_name + " " + connect.last_name}</li>
                                        </div>
                                        <li className="connectionsRemove" onClick={() => handleRemove(connect.connection_id)}>Remove</li>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}

                {/* map through family connections and display */}
                {family && connections?.map((connect, i) => {
                    return (
                        <div key={i}>
                            {(connect.relationship == "family" && connect.pending == false) &&
                                <ul>
                                    <Paper elevation={3}>
                                        <img className="connectionsImage" src={connect.profile_image} />
                                        <div className="connectionsName">
                                            <li>{connect.first_name + " " + connect.last_name}</li>
                                        </div>
                                        <li className="connectionsRemove" onClick={() => handleRemove(connect.connection_id)}>Remove</li>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}

                {/* map through connection requests and display */}
                {requests && connections?.map((connect, i) => {
                    // console.log("status", connect.pending)
                    // console.log('user b', connect.user_B_id)
                    return (
                        <div key={i}>
                            {((connect?.pending == true) && (user.id == connect?.user_B_id)) &&
                                <ul>
                                    <Paper elevation={3}>
                                        <img src={connect.profile_image} className="connectionsImage" />
                                        <div className="connectionsName">
                                            <li>{connect.first_name + " " + connect.last_name}</li>
                                        </div>
                                        <div className="requestBtn">
                                            <li className="connectionsIgnore" onClick={() => handleRemove(connect.connection_id)}>Ignore</li>
                                            <li className="connectionsAccept" onClick={() => handleAccept(connect.connection_id)}>Accept</li>
                                        </div>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}

            </Box>
        </>
    )
}

export default Connections;
