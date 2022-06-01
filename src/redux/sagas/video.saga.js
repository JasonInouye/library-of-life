import { put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

function* postUserVideos(action) {
  //console.log('post action', action.payload);
  try {
    yield axios.post('/api/video/', action.payload);
  } catch (error) {
    console.log('video saga POST', error);
  }
}

// get all user videos from the DB
function* getUserVideos() {
  try {
    const videos = yield axios.get('/api/video/userVideos/:id');
    //console.log('getting user videos:', videos.data);
    yield put({ type: 'SET_USER_VIDEOS', payload: videos.data }); //set in videoReducer
  } catch (error) {
    console.log('video saga GET', error);
  }
}

// get one user video from the DB
function* getSingleVideo(action) {
  const id = 10;
  // console.log('GET SINGLE VIDEO SAGA:', action.payload);
  try {
    const response = yield axios.get(`/api/video/${id}`);
    yield put({ type: 'SET_SINGLE_VIDEO', payload: response.data });
  } catch (error) {
    console.log('video saga GET', error);
  }
}

//get request url from s3
function* getUploadUrl(action) {
  try {
    const response = yield axios.get(`/api/upload`);

    const result = yield fetch(response.data.uploadURL, {
      method: 'PUT',
      body: action.payload,
    });
    // This will post the video file name that is returned from aws along with prompt selected by user
    yield put({ type: 'POST_VIDEO',payload: { key: response.data.Key, prompt: action.prompt },});
  } catch (error) {
    console.log('video saga GET', error);
  }
}

function* videoSaga() {
  yield takeLatest('GET_UPLOAD_URL', getUploadUrl);
  yield takeLatest('GET_USER_VIDEOS', getUserVideos);
  yield takeLatest('POST_VIDEO', postUserVideos);
  yield takeLatest('GET_SINGLE_VIDEO', getSingleVideo);
}

export default videoSaga;
