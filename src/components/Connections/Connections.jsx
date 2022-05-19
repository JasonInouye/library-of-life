import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Connections.css';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function Connections() {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connectionsReducer);

    const [toggle, setToggle] = React.useState('left');
    const [friends, setFriends] = useState(false);
    const [family, setFamily] = useState(false);

    const handleToggle = (event, newToggle) => {
        setToggle(newToggle);
    };

    const handleFriends = () => {
        setFriends(true);
        setFamily(false);
    };

    const handleFamily = () => {
        setFriends(false);
        setFamily(true);
    };

    useEffect(() => {
        dispatch({ type: 'GET_CONNECTIONS' })
    }, []);


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 300,
                        height: 50,
                    },
                }}>

               
                    {/* handle friends */}
                    {friends && connections?.map((connect, i) => {
                        return (
                            <div key={i}>
                                {connect.relationship == "friend" &&
                                    <ul>
                                        <Paper elevation={3}>
                                        <li>{connect.first_name + " " + connect.last_name}</li>
                                        <li>remove</li>
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
                                        <li>{connect.first_name + " " + connect.last_name}</li>
                                        <li>remove</li>
                                        </Paper>
                                    </ul>}
                            </div>
                        )
                    })}
            </Box>

            <ToggleButtonGroup
                value={toggle}
                exclusive
                onChange={(event) => { handleToggle(event.target.value) }}
                aria-label="connections">
                <ToggleButton onClick={() => { handleFriends() }} value="friends" aria-label="left aligned">
                    <h1>Friends</h1>
                </ToggleButton>
                <ToggleButton onClick={() => { handleFamily() }} value="family" aria-label="centered">
                    <h1>Family</h1>
                </ToggleButton>
            </ToggleButtonGroup>




        </>
    )
}

export default Connections;