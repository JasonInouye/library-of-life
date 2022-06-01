import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get all user prompts from the DB
function* getPromptList() {

  try {
    const prompts = yield axios.get('/api/prompt');
    //console.log('getting user prompts:', prompts.data);
    yield put({ type: 'SET_PROMPTS', payload: prompts.data }); //set in videoReducer
  } catch (error) {
    console.log('prompt saga GET', error);
  }
}

function* getPrompt() {
  yield takeLatest('GET_PROMPTS', getPromptList);
}

export default getPrompt;