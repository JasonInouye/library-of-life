import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



// 
function* setShareReducer(action) {
  console.log('setShareReducer SAGA data:', action.payload);
//   try{
//       yield axios.post('/api/share/', action.payload);
//   } catch(err){
//       console.log(err);
//   }
}

function* shareSaga() {

    yield takeLatest('SET_SHARE_REDUCER', setShareReducer);
  
  }

export default shareSaga;