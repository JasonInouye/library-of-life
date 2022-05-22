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



export default function SelectToShare() {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connectionsReducer);
    const [personName, setPersonName] = React.useState([]);

    const names = [
        connections
    ];

    // TODO hook up to DB to grab connections
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    console.log('selected people are:', personName);

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
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {connections.map((connection) => (
                        <MenuItem key={connection.id} value={connection.first_name + " " + connection.last_name}>
                            <Checkbox checked={personName.indexOf(connections) > -1} />
                            <ListItemText primary={connection.first_name + " " + connection.last_name} secondary={connection.relationship} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
