import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSharedVideos() {
    try {
        const response = yield axios.get('/api/share');

        yield put({ type: 'SET_SHARED_VIDEOS', payload: response.data })
    } catch (error) {
        console.log('share saga GET', error);
    }
}

function* postShare(action) {

    //console.log('postShare SAGA data:', action.payload);
    try {
        yield axios.post('/api/share/', action.payload);
        yield put ({ type: 'CLEAR_SHARE_REDUCER' })
    } catch (error) {
        console.log('share saga POST', error);
    }
}

function* shareSaga() {
    yield takeLatest('GET_SHARED_VIDEOS', getSharedVideos)
    yield takeLatest('POST_SHARE', postShare);

}

export default shareSaga;