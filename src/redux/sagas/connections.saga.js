import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//get all connections from DB
function* getConnections() {
    try {
        const response = yield axios.get('/api/connections');
        console.log('GET connections', response.data);
        yield put({type: 'SET_CONNECTIONS', payload: response.data});
    } catch (error){
        console.log('Error in get connections saga', error);
    }
}

function* connectionsSaga(){
    yield takeLatest('GET_CONNECTIONS', getConnections);
}

export default connectionsSaga;