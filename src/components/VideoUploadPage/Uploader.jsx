import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';  

function Uploader() {
  const dispatch = useDispatch();
  const axios = require('axios').default;
  const [videoPrompt, setVideoPrompt] = useState('');
  const prompts = useSelector((store) => store.promptReducer);

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_PROMPTS' });
  }, []);

  const getUploadParams = ({ meta }) => {
    const url = 'https://httpbin.org/post';
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  const API_ENDPOINT =
    //"https://y2b420b6eh.execute-api.us-east-2.amazonaws.com/default/getPresignedImageUrl";
    'https://hfoxt7tc91.execute-api.us-east-1.amazonaws.com/default/getPresignedVideoURL2';
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log('this is the status', status, meta);
  };

  const handleSubmit = async (files) => {
    const f = files[0];
    console.log(f['file']);
    // * GET request: presigned URL
    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT,
    });

    console.log('Response: ', response.data.Key);

    // key is the video id from AWS
    dispatch({ type: 'POST_VIDEO', payload: { key: response.data.Key } });

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      body: f['file'],
    });
    console.log('Result: ', result);
  };

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

      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent='Upload A Movie'
        accept='video/*'
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green' },
        }}
      />
    </div>
  );
};
export default Uploader;
