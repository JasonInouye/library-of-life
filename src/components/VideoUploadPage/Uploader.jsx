import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';  


// const prompts = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

function Uploader() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [videoPrompt, setVideoPrompt] = useState('');
  const prompts = useSelector((store) => store.promptReducer);

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_PROMPTS' });
  }, []);

  console.log('value of prompt', videoPrompt);

  return (
    <div>
      <Box justifyContent="center" sx={{ maxWidth: 420 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Prompt</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={videoPrompt}
          label="prompt"
          onChange={(event) => setVideoPrompt(event.target.value)}
        >
          {prompts.map((prompt) => (
              <MenuItem
                key={prompt.id}
                value={prompt.id}
              >
                {prompt.prompt}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    </div>
  );
}
export default Uploader;
