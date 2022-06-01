import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//get all connections from DB
function* getConnections() {
    try {
        const response = yield axios.get('/api/connections');
        //console.log('GET connections', response.data);
        yield put({ type: 'SET_CONNECTIONS', payload: response.data });
    } catch (error) {
        console.log('Error in get connections saga', error);
    }
}

function* postRequest(action) {
    try {
        yield axios.post('/api/connections', action.payload);

        yield put({ type: 'GET_PENDING_STATUS', payload: action.payload.userB });
    } catch (error) {
        console.log('Error with request saga:', error);
    }
}

function* acceptConnections(action) {
    const id = action.payload;
    try {
        yield axios.put(`/api/connections/${id}`)

        yield put({ type: 'GET_CONNECTIONS' })
    } catch (error) {
        console.log(error);
    }
}

function* deleteConnections(action) {
    const id = action.payload;
    //console.log('saga delete Connection id', id);
    try {
        yield axios.delete(`/api/connections/${id}`)

        yield put({ type: 'GET_CONNECTIONS' })
    } catch (error) {
        console.log(error);
    }
}

function* connectionsSaga() {
    yield takeLatest('GET_CONNECTIONS', getConnections);
    yield takeLatest('POST_REQUEST', postRequest);
    yield takeLatest('ACCEPT_CONNECTIONS', acceptConnections);
    yield takeLatest('DELETE_CONNECTIONS', deleteConnections);
}

export default connectionsSaga;