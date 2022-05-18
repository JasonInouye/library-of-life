import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Connections () {

    const dispatch = useDispatch();

    const connections = useSelector((store) => store.connectionsReducer);
    console.log(connections);

    useEffect(() => {
        dispatch({type: 'GET_CONNECTIONS'})
    }, [])

    return (
        <>

        {/* {connections.relationship = "friend" && 
        // show friends
        }

        {connections.relationship = "family" && 
        //show family 
        }

        {connections && 
        //show all 
        } */}
        
        </>
    )
}

export default Connections;