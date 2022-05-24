import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import {
  Button,
  IconButton,
  Modal,
  Typography,
  TextField,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Uploader() {
  const dispatch = useDispatch();
  const axios = require('axios').default;
  const video = useSelector((store) => store.videoReducer);
  const [videoPrompt, setVideoPrompt] = useState('');
  const [open, setOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState([]);
  const prompts = useSelector((store) => store.promptReducer);
  const [openVideoModal, setOpenVideoModal] = React.useState(false);

  // useEffect(() => {
  //   // dispatch to get all items to display on the DOM
  //   dispatch({ type: 'GET_PROMPTS' });
  // }, []);

  console.log('this is the prompt id', videoPrompt);

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
    dispatch({
      type: 'SET_MODAL_VIDEO',
      payload: response.data.Key,
    });

    dispatch({
      type: 'POST_VIDEO',
      payload: { key: response.data.Key, prompt: videoPrompt },
    });

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      body: f['file'],
    });
    console.log('Result: ', result);
  };

  const handleChangeVideo = () => {
    dispatch({
      type: 'CLEAR_VIDEO',
    });
  };
  const handleOpenVideoModal = () => {
    dispatch({ type: 'GET_PROMPTS' });
    setOpenVideoModal(true)
  };

  const handleCloseVideoModal = () => {
    dispatch({type: 'GET_PROMPTS'});
    setOpenVideoModal(false)
  };

  const dialogTitle = () => (
    <>
      <span>Upload Video</span>
      <IconButton
        style={{ right: '12px', top: '8px', position: 'absolute' }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>
    </>
  );

  return (
    <div className='upload'>
      {/* <Box justifyContent='center' sx={{ maxWidth: 420 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Prompt</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={videoPrompt}
            label='prompt'
            onChange={(event) => setVideoPrompt(event.target.value)}
          >
            {prompts.map((prompt) => (
              <MenuItem key={prompt.id} value={prompt.id}>
                {prompt.prompt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}

      {/* <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
        Add Video
      </Button>

      <DropzoneDialogBase
        dialogTitle={dialogTitle()}
        acceptedFiles={['video/*']}
        fileObjects={fileObjects}
        cancelButtonText={'cancel'}
        submitButtonText={'submit'}
        filesLimit={1}
        maxFileSize={10000000}
        open={open}
        onAdd={(newFileObjs) => {
          console.log('onAdd', newFileObjs);
          setFileObjects(newFileObjs);
        }}
        onDelete={(deleteFileObj) => {
          console.log('onDelete', deleteFileObj);
          setFileObjects([]);
        }}
        onClose={() => setOpen(false)}
        onSave={handleSubmit(fileObjects)}
        showPreviews={true}
        showFileNamesInPreview={true}
      /> */}
      {/* <DropzoneArea
        maxFileSize={10000000}
        filesLimit={1}
        onChange={(files) => console.log('Files:', files)}
      /> */}

      {/* <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={1}
        multiple={false}
        canCancel={true}
        inputContent='Upload A Movie'
        accept='video/*'
        styles={{
          dropzone: { width: '100%', minHeight: 250, maxHeight: 250, textAlign: 'center', padding: '20px', }
        }} 
      />*/}
      {video.file ? (
        <Box>
          <p>{video.file.name}</p>
          <Button
            onClick={handleChangeVideo}
            style={{
              marginBottom: 15,
            }}
          >
            Remove Video
          </Button>
        </Box>
      ) : (
        <Button
          onClick={handleOpenVideoModal}
          style={{
            marginBottom: 15,
          }}
        >
          Add Video
        </Button>
      )}
      <Modal
        open={openVideoModal}
        onClose={handleCloseVideoModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          marginBottom: 15,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            borderRadius: '7px',
            boxShadow: 10,
            p: 4,
          }}
        >
                  <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Prompt</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={videoPrompt}
            label='prompt'
            onChange={(event) => setVideoPrompt(event.target.value)}
          >
            {prompts.map((prompt) => (
              <MenuItem key={prompt.id} value={prompt.id}>
                {prompt.prompt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Video Here!
          </Typography>
          {video.file ? (
            <h1>{video.file.name} Has Been Added!</h1>
          ) : (
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              maxFiles={1}
              inputContent={(files, extra) =>
                extra.reject ? 'Video files only' : 'Click or Drag 1 Video Here'
              }
              styles={{
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                inputLabel: (files, extra) =>
                  extra.reject ? { color: 'red' } : {},
                dropzone: {
                  width: '100%',
                  minHeight: 250,
                  maxHeight: 250,
                  textAlign: 'center',
                },
                dropzoneActive: { borderColor: 'green' },
              }}
              accept='video/*'
            />
          )}
        </Box>
      </Modal>
        {/* canCancel={false}
        inputContent='Drag and drop a video here'
        styles={{
          dropzone: { width: 400, height: 200, border:'1px solid gray' },
          dropzoneActive: { borderColor: 'green' },
        }}
        // TODO change font color/style in dzu-input-label?
      /> */}
    </div>
  );
}
export default Uploader;
