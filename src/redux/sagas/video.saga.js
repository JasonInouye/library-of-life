import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postUserVideos(action) {
  console.log('post action', action.payload);
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
    console.log('getting user videos:', videos.data);
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

//delete one user video from the DB
function* deleteVideo(action) {
  const id = action.payload;
  console.log('saga deleteVideo func id:', id);
  try {
    yield axios.delete(`/api/video/${id}`)
    yield put({ type: 'GET_SINGLE_VIDEO' })
  } catch (error) {
    console.log(error);
  }
}

//get request url from s3
function* getUploadUrl(){
  try {
      const response = yield axios.get(`/api/upload/`)
      console.log( 'this is the results of API', response.data);
      yield put({ type: 'SET_UPLOAD_VID_URL', payload: response.data })
      // yield put ({
      //     type: 'SET_MANY_SEARCH', payload: response.data
      // })
  } catch(err) {
      console.log(err);
  }
}

function* videoSaga() {

  yield takeLatest('GET_USER_VIDEOS', getUserVideos);
  yield takeLatest('POST_VIDEO', postUserVideos);
  yield takeLatest('GET_SINGLE_VIDEO', getSingleVideo);
  yield takeLatest('DELETE_VIDEO', deleteVideo);
  yield takeLatest('GET_UPLOAD_URL', getUploadUrl);

}

export default videoSaga;