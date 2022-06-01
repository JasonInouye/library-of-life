import { put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

//get request url from s3
function* getPhotoUrl(action) {
  try {
    const response = yield axios.get(`/api/photo`);

    const result = yield fetch(response.data.uploadURL, {
      method: 'PUT',
      body: action.payload,
    });

    yield put({ type: 'UPDATE_PHOTO',payload: { key: response.data.Key }});
  } catch (error) {
    console.log('photo saga GET', error);
  }
}

//PUT request to update users profile photo
function* updateProfilePhoto(action) {
    //console.log('put action', action.payload);
    try {
      yield axios.put('/api/photo', action.payload);
      yield put({type: 'GET_USER'})
    } catch (error) {
      console.log('photo saga PUT', error);
    }
  }

function* photoSaga() {
  yield takeLatest('GET_PHOTO_URL', getPhotoUrl);
  yield takeLatest('UPDATE_PHOTO', updateProfilePhoto);
}

export default photoSaga;