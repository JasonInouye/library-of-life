import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getPendingStatus(action) {
    try {
        const response = yield axios.get(`/api/request/${action.payload}`);
        // yield console.log('In getPendingStatus in request saga. Data is:', response.data);
        yield put({ type: 'SET_PENDING_STATUS', payload: response?.data[0] })

    } catch (error) {
        console.log('request saga GET', error);
    }
}

function* requestSaga() {
    yield takeLatest('GET_PENDING_STATUS', getPendingStatus);
}

export default requestSaga;