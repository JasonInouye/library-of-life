import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// get all user permissions from the DB
function* getPermission(action) {
  const video_id = action.payload;
  try {
    const permissions = yield axios.get(`/api/permission/${video_id}`);
    //yield console.log('getting user permissions:', permissions.data[0].permission);
    yield put({ type: 'SET_PERMISSION', payload: permissions.data[0]?.permission }); //set in videoReducer

  } catch (error) {
    console.log('permission saga GET', error);
  }
}

function* updatePermission(action) {
  const video_id = action.payload.video_id; //all info expected in payload
  const permission = action.payload.permission;
  //('SAGA updatePermission payload should be:', action.payload.permission);

  try {
    yield axios.put(`/api/permission/${video_id}`, {permission});
    //the "id" in action.payload.id is the actual permission level being updated

    yield put({ type: 'GET_PERMISSION', payload: video_id }); //GET following PUT

    yield put({ type: 'GET_USER_VIDEOS'})

  } catch (error) {
    console.log('permission saga PUT', error);
  }
}

function* permissionSaga() {

  yield takeLatest('GET_PERMISSION', getPermission);
  yield takeLatest('UPDATE_PERMISSION', updatePermission);


}

export default permissionSaga;