import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "GET_USER" actions
// updated getUser to getUser
function* getUser(action) {

  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });

    yield action.callback;
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// changed get to get in both the type and function name
function* userSaga() {
  yield takeLatest('GET_USER', getUser);
}

export default userSaga;
