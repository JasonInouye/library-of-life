import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



// 
function* shareVideo(action) {
  console.log('post action', action.payload);
  try{
      yield axios.post('/api/video/', action.payload);
  } catch(err){
      console.log(err);
  }
}

function* shareSaga() {

    yield takeLatest('SHARE_VIDEO', shareVideo);
  
  }

export default shareSaga;