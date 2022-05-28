import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* postBanner(action) {

      console.log('postBanner SAGA data:', action.payload);
    try {
        yield axios.put('/api/banner/', action.payload)
        // yield put({type: 'GET_SEARCHED_USER'})
        // FIXME figure out how to re-render DOM upon success
        yield put ({type: 'SET_BANNER_REDUCER', payload: action.payload })
    } catch (err) {
        console.log(err);
    }
}

function* bannerSaga() {

    yield takeLatest('POST_BANNER', postBanner);

}

export default bannerSaga;