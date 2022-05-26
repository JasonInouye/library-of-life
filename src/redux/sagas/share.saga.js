import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* postShare(action) {

    console.log('postShare SAGA data:', action.payload);
    try {
        yield axios.post('/api/share/', action.payload);
        yield put ({ type: 'CLEAR_SHARE_REDUCER' })
    } catch (err) {
        console.log(err);
    }
}

function* shareSaga() {

    yield takeLatest('POST_SHARE', postShare);

}

export default shareSaga;