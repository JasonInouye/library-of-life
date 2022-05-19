import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/*
function* addBakesale(action) {
  try {
    // passes user's bakesale data from the payload to the server
    yield axios.post('/api/bakesale/addBakesale', action.payload);
    yield put

  } catch (error) {
    console.log('Error with add bakesale saga:', error);
  }
}
*/

// get all user prompts from the DB
function* getPrompts() {

  try {
    const prompts = yield axios.get('/api/permission/:id');
    console.log('getting user prompts:', prompts.data);
    yield put({ type: 'SET_PROMPTS', payload: prompts.data }); //set in videoReducer

  } catch (error) {
    console.log('Error with getPrompts saga:', error);
  }
}

/*
// get one Bakesale from the DB by id
function* fetchBakesaleDetail(action) {

  const id = action.payload;
  console.log('SAGA single bakesale id:', id);

  try {
    const bakesale = yield axios.get(`/api/bakesale/detail/${id}`);

    yield put({ type: 'SET_SINGLE_BAKESALE', payload: bakesale.data }); //set selected bakesale in bakesaleReducer

  } catch (error) {
    console.log('Error with fetchBakesaleDetail saga:', error);
  }
}
*/


function* updatePermission(action) {
//   const video_id = action.payload.video_id; //all info expected in payload
  console.log('SAGA updatePermission payload should be:', action.payload);

//   try {
//     yield axios.put(`/api/permission/${video_id}`, action.payload.id);
//     //the "id" in action.payload.id is the actual permission level being updated

//     yield put({ type: 'GET_PERMISSION' }); //GET following PUT

//   } catch (error) {
//     console.log('Error with updatePermission saga:', error);
//   }
}


/*
function* deleteBakesale(action) {
  const id = action.payload; //because all treat info expected in payload
  console.log('SAGA delete bakesale:', id);

  try {
    yield axios.delete(`/api/bakesale/delete/${id}`);

    yield put({ type: 'FETCH_BAKESALES' }); //GET following DELETE

  } catch (error) {
    console.log('Error with deleteBakesale saga:', error);
  }
}
*/

function* permissionSaga() {

  yield takeLatest('GET_PERMISSION', getPrompts);

  
}

export default permissionSaga;