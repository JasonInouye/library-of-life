import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    console.log('AP', action.payload)

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* editUser(action){
  try{
  console.log('Update User', action);
  yield axios.put(`/api/user/update/${action.payload.id}`, action.payload)
  yield put({ type: 'GET_USER' });
  } catch (error){
    console.log('Error in Update', error);
  }
} 

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('UPDATE_USER', editUser);
}

export default registrationSaga;
