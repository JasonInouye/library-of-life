import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';



import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

export default function SelectToShare({ video }) {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connectionsReducer);
    const [personName, setPersonName] = React.useState([]);
    const [selectedIDs, setSelectedIDs] = React.useState([]);
    const [selectedVideoIDs, setSelectedVideoIDs] = React.useState(0);

    let shareObj = {
        user_id: selectedIDs,
        video_id: selectedVideoIDs
    };

    const handleConnectionObj = async (id) => {
        console.log("in handleConnectionObj", id);
        let updatedSelectedIDs = [];

        setSelectedVideoIDs(video.id);

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


    console.log("values in shareObj", shareObj);

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
                            key={connection.id}
                            value={connection.first_name + " " + connection.last_name}>

                            <Checkbox
                                onChange={() => handleConnectionObj(connection.id)}
                                checked={selectedIDs.indexOf(connection.id) > -1} />

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
