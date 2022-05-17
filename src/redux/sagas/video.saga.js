import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/*
function* addBakesale(action) {
  try {
    // passes user's bakesale data from the payload to the server
    yield axios.post('/api/bakesale/addBakesale', action.payload);
    yield put

  } catch (error) {
    console.log('Error with add bakesale saga:', error);
  }
}
*/

// get all user videos from the DB
function* getUserVideos() {

  try {
    const videos = yield axios.get('/api/video/getVideos');
    console.log('getting user videos:', videos.data);
    yield put({ type: 'SET_USER_VIDEOS', payload: videos.data }); //set in videoReducer

  } catch (error) {
    console.log('Error with getUserVideos saga:', error);
  }
}

/*
// get one Bakesale from the DB by id
function* fetchBakesaleDetail(action) {

  const id = action.payload;
  console.log('SAGA single bakesale id:', id);

  try {
    const bakesale = yield axios.get(`/api/bakesale/detail/${id}`);

    yield put({ type: 'SET_SINGLE_BAKESALE', payload: bakesale.data }); //set selected bakesale in bakesaleReducer

  } catch (error) {
    console.log('Error with fetchBakesaleDetail saga:', error);
  }
}
*/

/*
function* editBakesale(action) {
  const id = action.payload.id; //because all threat info expected in payload
  // console.log('SAGA edit bakesale:', action.payload.id);

  try {
    yield axios.put(`/api/bakesale/${id}`, action.payload);

    yield put({ type: 'FETCH_BAKESALES' }); //GET following PUT

  } catch (error) {
    console.log('Error with editBakesale saga:', error);
  }
}
*/

/*
function* deleteBakesale(action) {
  const id = action.payload; //because all threat info expected in payload
  console.log('SAGA delete bakesale:', id);

  try {
    yield axios.delete(`/api/bakesale/delete/${id}`);

    yield put({ type: 'FETCH_BAKESALES' }); //GET following DELETE

  } catch (error) {
    console.log('Error with deleteBakesale saga:', error);
  }
}
*/

function* videoSaga() {

  yield takeLatest('GET_USER_VIDEOS', getUserVideos);
  
}

export default videoSaga;