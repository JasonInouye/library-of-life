import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postRequest(action) {
    try {
        yield axios.post('/api/request', action.payload);

        // yield put({ type: 'SET_LIST_OF_USERS', payload: { listOfUsers: response.data, currentUser: action.payload } });
    } catch (error) {
        console.log('Error with request saga:', error);
    }
}

function* requestSaga() {
    yield takeLatest('POST_REQUEST', postRequest);
}

export default requestSaga;