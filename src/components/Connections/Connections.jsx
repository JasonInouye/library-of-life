import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Connections.css';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function Connections() {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connectionsReducer);
    const history = useHistory();
    const user = useSelector((store) => store.user);

    const [toggle, setToggle] = React.useState('left');
    const [all, setAll] = useState(false);
    const [friends, setFriends] = useState(false);
    const [family, setFamily] = useState(false);
    const [requests, SetRequests] = useState(false);

    const handleToggle = (event, newToggle) => {
        setToggle(newToggle);
    };

    const handleAll = () => {
        setAll(true);
        setFriends(false);
        setFamily(false);
        SetRequests(false);
    }

    const handleFriends = () => {
        setAll(false);
        setFriends(true);
        setFamily(false);
        SetRequests(false);
    };

    const handleFamily = () => {
        setAll(false);
        setFriends(false);
        setFamily(true);
        SetRequests(false);
    };

    const handleRequests = () => {
        setAll(false);
        setFriends(false);
        setFamily(false);
        SetRequests(true);
    }

    const handleRemove = (id) => {
        dispatch({ type: 'DELETE_CONNECTIONS', payload: id });
    }

    const handleAccept = (id) => {
        dispatch({ type: 'ACCEPT_CONNECTIONS', payload: id });
    }

    useEffect(() => {
        dispatch({ type: 'GET_CONNECTIONS' })
    }, []);


    return (
        <>
        <Box
         sx={{
            borderRadius: 2,
            m: 10
          }}
        >
            <div className="toggleRight">
                <ToggleButtonGroup
                    value={toggle}
                    color="primary"
                    size="small"
                    exclusive
                    onChange={(event) => { handleToggle(event.target.value) }}
                    aria-label="connections">
                    
                   <div className="work"> <ToggleButton onClick={() => { handleAll() }} value="friends" aria-label="friends">
                        <h3>All</h3>
                    </ToggleButton> </div>
                    
                    <div className="work">  <ToggleButton onClick={() => { handleFriends() }} value="friends" aria-label="friends">
                        <h3>Friends</h3>
                    </ToggleButton>  </div>
                    
                    <div className="work"> <ToggleButton onClick={() => { handleFamily() }} value="family" aria-label="family">
                        <h3>Family</h3>
                    </ToggleButton> </div>
                    
                    <div className="work">  <ToggleButton onClick={() => { handleRequests() }} value="requests" aria-label="requests">
                        <h3>Requests</h3>
                    </ToggleButton> </div>
                
                </ToggleButtonGroup>
            </div>
            </Box>

            <Box
                sx={{
                    '& > :not(style)': {
                        width: 350,
                    },
                }}>
                
                {/* handle all */}
                {all && connections?.map((connect, i) => {
                    return (
                        <div key={i}>
                            {((connect.relationship == "friend" || "family") && connect.pending == false) &&
                                <ul>
                                    <Paper onClick={() => { history.push(`/user/${connect.id}/videos`) }} elevation={3}>
                                        <img className="connectionsImage" src={connect.profile_image} />
                                        <div className="connectionsName" >
                                            <li>{connect.first_name + " " + connect.last_name}</li>
                                        </div>
                                        <li className="connectionsRemove" onClick={() => handleRemove(connect.id)}>Remove</li>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}


                {/* handle friends */}
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
                                        <li className="connectionsRemove" onClick={() => handleRemove(connect.id)}>Remove</li>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}

                {/* handle family */}
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
                                        <li className="connectionsRemove" onClick={() => handleRemove(connect.id)}>Remove</li>
                                    </Paper>
                                </ul>}
                        </div>
                    )
                })}

                {/* {requests && } */}
                {requests && connections?.map((connect, i) => {
                    console.log(connect.pending)
                    return (
                        <div key={i}>
                            {connect?.pending == true && user.id == connect?.user_B_id &&
                                <ul>
                                    <Paper elevation={3}>
                                        <img src={connect.profile_image} className="connectionsImage"/>
                                        <div className="connectionsName">
                                            <li>{connect.first_name + " " + connect.last_name}</li>
                                        </div>
                                        <div className="requestBtn">
                                        <li className="connectionsIgnore" onClick={() => handleRemove(connect.id)}>Ignore</li>
                                        <li className="connectionsAccept" onClick={() => handleAccept(connect.id)}>Accept</li>
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
