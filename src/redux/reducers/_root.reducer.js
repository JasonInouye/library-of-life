import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import searchReducer from './search.reducer'
import videoReducer from './video.reducer';
import connectionsReducer from './connections.reducer';
import permissionReducer from './permission.reducer';
import promptReducer from './prompt.reducer';
import pendingStatus from './request.reducer';
import videoModalReducer from './videoModal.reducer';
import shareReducer from './share.reducer';
import urlReducer from './urlRequest.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,// will have an id and username if someone is logged in
  videoReducer,
  connectionsReducer,
  permissionReducer, 
  promptReducer,
  searchReducer,
  pendingStatus,
  videoModalReducer, // did not want to bleed this data into the videoReducer
  shareReducer,
  urlReducer,
});


export default rootReducer;
