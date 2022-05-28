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

function PhotoUploader() {
  useEffect(() => {
    dispatch({
      type: 'CLEAR_PHOTO',
    });
  }, []);


  const dispatch = useDispatch();
  const photo = useSelector((store) => store.photoReducer);  
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

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

      const f = files[0];
      console.log(f['file']);

      // Triggers the presigned URL process from lambda function on aws
      dispatch({
        type: 'GET_PHOTO_URL',
        payload: f['file']
      });

      // Empties Dropzone
      console.log(files.map((f) => f.meta));
      allFiles.forEach((f) => f.remove());

      //Close Dropzone and Clear Prompt State
      setOpenPhotoModal(false);
      setTimeout(swalWait, 2000);
      function swalWait() {
      Swal.fire({
        icon: 'success',
        title: 'Successful Upload',
        footer: 'Photo has been updated successfully',
      });
    }
    
  };

  const handleChangePhoto = () => {
    dispatch({
      type: 'CLEAR_PHOTO',
    });
  };

  const handleOpenPhotoModal = () => {
    setOpenPhotoModal(true);
  };

  const handleClosePhotoModal = () => {
    setOpenPhotoModal(false);
  };

  return (
    <div className='upload'>
      {photo.file ? (
        <Box>
          <p>{photo.file.name}</p>
          <Button
            onClick={handleChangePhoto}
            style={{
              marginBottom: 15,
            }}
          >
            Remove Photo
          </Button>
        </Box>
      ) : (
        <Button
          onClick={handleOpenPhotoModal}
          style={{
            marginBottom: 15,
          }}
        >
          Add Profile Photo
        </Button>
      )}
      <Modal
        open={openPhotoModal}
        onClose={handleClosePhotoModal}
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
          {/* <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Prompt</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={photoPrompt}
              label='prompt'
              onChange={(event) => setPhotoPrompt(event.target.value)}
            >
              {prompts.map((prompt) => (
                <MenuItem key={prompt.id} value={prompt.id}>
                  {prompt.prompt}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Photo Here!
          </Typography>
          {photo.file ? (
            <h1>{photo.file.name} Has Been Added!</h1>
          ) : (
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              maxFiles={1}
              canCancel={false}
              inputContent={(files, extra) =>
                extra.reject ? 'Photo files only' : 'Click or Drag 1 Photo Here'
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
              accept='photo/*'
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default PhotoUploader;
