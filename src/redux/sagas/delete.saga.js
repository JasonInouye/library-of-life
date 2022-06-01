import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//delete one user video from the DB
function* deleteVideo(action) {
    const id = action.payload;
    //console.log('saga deleteVideo func id:', id);
    try {
      yield axios.delete(`/api/video/${id}`)
      yield put({ type: 'GET_USER_VIDEOS' })
    } catch (error) {
      console.log('delete saga DELETE', error);
    }
  }

  function* deleteSaga() {

   
    yield takeLatest('DELETE_VIDEO', deleteVideo);
  
  }
  
  export default deleteSaga;