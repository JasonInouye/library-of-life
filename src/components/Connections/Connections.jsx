import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Connections.css';

function Connections () {

    const dispatch = useDispatch();

    const connections = useSelector((store) => store.connectionsReducer);
    console.log(connections);

    useEffect(() => {
        dispatch({type: 'GET_CONNECTIONS'})
    }, [])

    return (
        <>

        {/* FRIEND: if user a id = user id  && relationship = friend, show user b */}
        {/* FAMILY: if user a id = user id  && relationship = family, show user b */}
        {/* ALL: if user a id = user id, show user b */}


        {connections?.map((connect) => {
            return (
                // {connect.relationship = "family"  }
                <ul>
                    <li>{connect.first_name + " " + connect.last_name}</li>
                </ul>
            )
        })}
        
        </>
    )
}

export default Connections;