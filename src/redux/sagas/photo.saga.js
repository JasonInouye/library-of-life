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
    console.log(result);

    //yield put({ type: 'SET_MODAL_VIDEO', payload: response.data.Key });
    yield put({ type: 'UPDATE_PHOTO',payload: { key: response.data.Key }});
  } catch (err) {
    console.log(err);
  }
}

//PUT request to update users profile photo
function* updateProfilePhoto(action) {
    console.log('put action', action.payload);
    try {
      yield axios.put('/api/photo', action.payload);
    } catch (err) {
      console.log(err);
    }
  }

function* photoSaga() {
  yield takeLatest('GET_PHOTO_URL', getPhotoUrl);
  yield takeLatest('UPDATE_PHOTO', updateProfilePhoto);
}

export default photoSaga;