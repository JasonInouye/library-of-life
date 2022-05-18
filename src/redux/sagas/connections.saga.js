import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//get all connections from DB
function* getConnections() {
    try {
        const connections = yield axios.get('/api/connections');
        console.log('GET connections', connections.data);
        yield put({type: 'SET_CONNECTIONS', payload: connections.data});
    } catch (error){
        console.log('Error in get connections saga');
    }
}

function* connectionsSaga(){
    yield takeLatest('GET_CONNECTIONS', getConnections);
}

export default connectionsSaga;