import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    ListItemText,
    Select,
    Checkbox
}
    from '@mui/material';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function SelectToShare({ video }) {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connectionsReducer);

    const [personName, setPersonName] = React.useState([]);
    const [selectedIDs, setSelectedIDs] = React.useState([]);

    // console.log(connections);

    const handleConnectionObj = async (id) => {

        let shareObj = {
            user_id: selectedIDs,
            video_id: video.id
        };

        let updatedSelectedIDs = [];

        // Conditional checks to see if checked person is already selected; if so, remove them, if not, add them
        // This in turn is also what makes the checkboxes themselves check/uncheck
        if (selectedIDs.indexOf(id) != -1) {
            updatedSelectedIDs = selectedIDs.filter(idToRemove => idToRemove != id)
            setSelectedIDs(updatedSelectedIDs);
            shareObj.user_id = updatedSelectedIDs;
            dispatch({ type: 'SET_SHARE_REDUCER', payload: shareObj })

        } else {
            setSelectedIDs([...selectedIDs, id]);
            shareObj.user_id = [...selectedIDs, id];
            dispatch({ type: 'SET_SHARE_REDUCER', payload: shareObj })

        }
    }

    // console.log("values in shareObj", shareObj);

    const handleSelectedName = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel
                    id="demo-multiple-checkbox-label">
                    Choose from your connections
                </InputLabel>

                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleSelectedName}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >

                    {connections.map((connection) => (
                        <MenuItem
                            key={connection.user_id}
                            value={connection.first_name + " " + connection.last_name}>

                            <Checkbox
                                onChange={() => handleConnectionObj(connection.user_id)}
                                checked={selectedIDs.indexOf(connection.user_id) > -1} />

                            <ListItemText
                                primary={connection.first_name + " " + connection.last_name}
                                secondary={connection.relationship} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}


export default SelectToShare;