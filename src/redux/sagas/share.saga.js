import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSharedVideos() {
    try {
        const response = yield axios.get('/api/share');

        yield put({ type: 'SET_SHARED_VIDEOS', payload: response.data })
    } catch (err) {
        console.log(err);
    }
}

function* postShare(action) {

    //   console.log('postShare SAGA data:', action.payload);
    try {
        yield axios.post('/api/share/', action.payload)
    } catch (err) {
        console.log(err);
    }
}

function* shareSaga() {
    yield takeLatest('GET_SHARED_VIDEOS', getSharedVideos)
    yield takeLatest('POST_SHARE', postShare);

}

export default shareSaga;