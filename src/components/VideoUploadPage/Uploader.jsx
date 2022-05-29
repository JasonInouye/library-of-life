import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import Swal from 'sweetalert2';
import {
  Button,
  Modal,
  Typography,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';

function Uploader() {
  useEffect(() => {
    dispatch({
      type: 'GET_PROMPTS',
    });
    dispatch({
      type: 'CLEAR_VIDEO',
    });
  }, []);


  const dispatch = useDispatch();
  const prompts = useSelector((store) => store.promptReducer);
  const video = useSelector((store) => store.videoReducer);
  const [videoPrompt, setVideoPrompt] = useState('');  
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const getUploadParams = ({ meta }) => {
    const url = 'https://httpbin.org/post';
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log('this is the status', status, meta);
  };

  const handleSubmit = async (files, allFiles) => {
    if (videoPrompt === '') {
      setOpenVideoModal(false);
      Swal.fire({
        icon: 'error',
        title: 'Prompt Required',
        footer: 'Please choose a Prompt before uploading',
      });
    } else {
      const f = files[0];
      console.log(f['file']);

      // Triggers the presigned URL process from lambda function on aws
      dispatch({
        type: 'GET_UPLOAD_URL',
        prompt: videoPrompt,
        payload: f['file']
      });

      // Empties Dropzone
      console.log(files.map((f) => f.meta));
      allFiles.forEach((f) => f.remove());

      //Close Dropzone and Clear Prompt State
      setOpenVideoModal(false);
      setVideoPrompt('');
      setTimeout(swalWait, 2000);
      function swalWait() {
      Swal.fire({
        icon: 'success',
        title: 'Successful Upload',
        footer: 'Video has been uploaded successfully',
      });
    }
    }
  };

  const handleChangeVideo = () => {
    dispatch({
      type: 'CLEAR_VIDEO',
    });
  };

  const handleOpenVideoModal = () => {
    dispatch({ type: 'GET_PROMPTS' });
    setOpenVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setVideoPrompt('');
    setOpenVideoModal(false);
  };

  return (
    <div className='upload'>
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
              canCancel={false}
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
    </div>
  );
}
export default Uploader;
