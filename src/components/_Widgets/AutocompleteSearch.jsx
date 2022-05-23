import React from 'react'
import { Link, useHistory } from 'react-router-dom';

import { Autocomplete, TextField } from '@mui/material';




function AutocompleteSearch({ listOfUsers }) {

    const history = useHistory();

    const goToUserPage = (event, value) => {
        history.push(`/user/${value.id}/videos`)
    }

    return (
        <Autocomplete
            id='users'
            options={listOfUsers}
            getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
            onChange={goToUserPage}
            fullWidth
            size='small'
            renderInput={(params) =>
                <TextField
                    sx={{ marginTop: '3px' }}
                    {...params} label=
                    'Search users by name'
                />}
            sx={{
                height: '0.3em',
                position: 'relative',
                top: '-1.1em',
                left: '2em'
            }}
        />
    )
}

export default AutocompleteSearch