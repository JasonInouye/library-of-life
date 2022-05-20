import React from 'react';
import { useDispatch } from 'react-redux';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

const Uploader = () => {
  const dispatch = useDispatch();
  const axios = require('axios').default;
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

      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent='Upload A Movie'
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green' },
        }}
      />
    </div>
  );
};
export default Uploader;
