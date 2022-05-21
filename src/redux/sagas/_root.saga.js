import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import searchSaga from './search.saga';
import videoSaga from './video.saga';
import connectionsSaga from './connections.saga';
import permissionSaga from './permission.saga';
import promptSaga from './prompt.saga';
import requestSaga from './request.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    connectionsSaga(),
    searchSaga(),
    videoSaga(),
    promptSaga(),
    requestSaga(),
    permissionSaga(),
  ]);
}
