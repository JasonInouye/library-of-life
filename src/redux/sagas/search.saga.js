import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUsers(action) {
    try {
        const response = yield axios.get('/api/search');

        yield put({ type: 'SET_LIST_OF_USERS', payload: { listOfUsers: response.data, currentUser: action.payload } });
    } catch (error) {
        console.log('Error with search saga:', error);
    }
}

function* getSearchedUser(action) {
    try {
        const response = yield axios.get(`/api/search/${action.payload}`);
        yield console.log('response', response.data)
        yield put({ type: 'SET_SEARCHED_USER', payload: response.data[0] });
        // yield put({ type: 'GET_SEARCHED_USER_VIDEOS', payload: action.payload })
        yield put({ type: 'GET_CONNECTIONS' })
        yield put({ type: 'GET_PENDING_STATUS', payload: action.payload });

    } catch (error) {
        console.log('Error with search saga:', error);
    }
}

function* getSearchedUserVideos(action) {
    try {
        const response = yield axios.get(`/api/search/videos/${action.payload}`);
        yield console.log('response', response.data)
        yield put({ type: 'SET_SEARCHED_USER_VIDEOS', payload: response.data })

    } catch (error) {
        console.log('Error with search saga:', error);
    }
}

function* searchSaga() {
    yield takeLatest('GET_USERS', getUsers);
    yield takeLatest('GET_SEARCHED_USER', getSearchedUser);
    yield takeLatest('GET_SEARCHED_USER_VIDEOS', getSearchedUserVideos)
}

export default searchSaga;