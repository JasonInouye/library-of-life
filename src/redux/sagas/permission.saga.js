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

// get all user permissions from the DB
function* getPermission(action) {
  const video_id = action.payload;
  try {
    const permissions = yield axios.get(`/api/permission/${video_id}`);
    yield console.log('getting user permissions:', permissions.data[0].permission);
    yield put({ type: 'SET_PERMISSION', payload: permissions.data[0]?.permission }); //set in videoReducer

  } catch (error) {
    console.log('Error with getPermission saga:', error);
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


function* updatePermission(action) {
  const video_id = action.payload.video_id; //all info expected in payload
  const permission = action.payload.permission;
  console.log('SAGA updatePermission payload should be:', action.payload.permission);

  try {
    yield axios.put(`/api/permission/${video_id}`, {permission});
    //the "id" in action.payload.id is the actual permission level being updated

    yield put({ type: 'GET_PERMISSION', payload: video_id }); //GET following PUT

    yield put({ type: 'GET_USER_VIDEOS'})

  } catch (error) {
    console.log('Error with updatePermission saga:', error);
  }
}


/*
function* deleteBakesale(action) {
  const id = action.payload; //because all treat info expected in payload
  console.log('SAGA delete bakesale:', id);

  try {
    yield axios.delete(`/api/bakesale/delete/${id}`);

    yield put({ type: 'FETCH_BAKESALES' }); //GET following DELETE

  } catch (error) {
    console.log('Error with deleteBakesale saga:', error);
  }
}
*/

function* permissionSaga() {

  yield takeLatest('GET_PERMISSION', getPermission);
  yield takeLatest('UPDATE_PERMISSION', updatePermission);


}

export default permissionSaga;