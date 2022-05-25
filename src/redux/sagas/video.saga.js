import { put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

function* postUserVideos(action) {
  //console.log('post action', action.payload);
  try{
      yield axios.post('/api/video/', action.payload);
  } catch(err){
      console.log(err);
  }
}

// get all user videos from the DB
function* getUserVideos() {

  try {
    const videos = yield axios.get('/api/video/userVideos/:id');
    // const permissions = yield axios.get('/api/permission'); //needs to get all existing permissions of user
    //console.log('getting user videos:', videos.data);
    yield put({ type: 'SET_USER_VIDEOS', payload: videos.data }); //set in videoReducer

  } catch (error) {
    console.log('Error with getUserVideos saga:', error);
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
    console.log('Video get request failed', error);
  }

}



//get request url from s3
function* getUploadUrl(action){
  console.log('this is the URL action', action.prompt);
  try {
      const response = yield axios.get(`/api/upload`)
      console.log('this is the URL data from GET', response.data);
      yield delay(5000);
      yield put({ type: 'SET_UPLOAD_VID_URL', payload: response.data })
      yield put({ type: 'SET_MODAL_VIDEO', payload: response.data.Key })
      //yield put({ type: 'POST_VIDEO', payload: { key: response.data.Key, prompt: action.prompt } })
  } catch(err) {
      console.log(err);
  }
}

function* videoSaga() {
  yield takeLatest('GET_UPLOAD_URL', getUploadUrl);
  yield takeLatest('GET_USER_VIDEOS', getUserVideos);
  yield takeLatest('POST_VIDEO', postUserVideos);
  yield takeLatest('GET_SINGLE_VIDEO', getSingleVideo);
  

}

export default videoSaga;