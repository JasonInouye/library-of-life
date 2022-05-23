import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get all user prompts from the DB
function* getPromptList() {

  try {
    const prompts = yield axios.get('/api/prompt');
    console.log('getting user prompts:', prompts.data);
    yield put({ type: 'SET_PROMPTS', payload: prompts.data }); //set in videoReducer
  } catch (error) {
    console.log('Error with getPrompts saga:', error);
  }
}


//function* updatePermission(action) {
//   const video_id = action.payload.video_id; //all info expected in payload
//  console.log('SAGA updatePermission payload should be:', action.payload);

//   try {
//     yield axios.put(`/api/permission/${video_id}`, action.payload.id);
//     //the "id" in action.payload.id is the actual permission level being updated

//     yield put({ type: 'GET_PERMISSION' }); //GET following PUT

//   } catch (error) {
//     console.log('Error with updatePermission saga:', error);
//   }
//}


function* getPrompt() {
  yield takeLatest('GET_PROMPTS', getPromptList);
}

export default getPrompt;