import { put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

//get request url from s3
function* getPhotoUrl(action) {
  try {
    const response = yield axios.get(`/api/upload`);

    const result = yield fetch(response.data.uploadURL, {
      method: 'PUT',
      body: action.payload,
    });
    console.log(result);

    //yield put({ type: 'SET_MODAL_VIDEO', payload: response.data.Key });
    // yield put({ type: 'POST_PHOTO',payload: { key: response.data.Key, prompt: action.prompt },});
  } catch (err) {
    console.log(err);
  }
}

function* photoSaga() {
  yield takeLatest('GET_UPLOAD_URL', getPhotoUrl);
}

export default photoSaga;