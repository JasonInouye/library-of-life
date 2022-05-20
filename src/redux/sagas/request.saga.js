import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getPendingStatus(action) {
    try {
        const response = yield axios.get(`/api/request/${action.payload}`);

        yield put({ type: 'SET_PENDING_STATUS', payload: response?.data[0].pending })

    } catch (error) {
        console.log('Error with request saga:', error);
    }
}

function* requestSaga() {
    yield takeLatest('GET_PENDING_STATUS', getPendingStatus);
}

export default requestSaga;