import { combineReducers } from 'redux';


const shareReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SHARE_REDUCER':
            return action.payload;
        case 'CLEAR_SHARE_REDUCER':
            return {};
        default:
            return state;
    }
};

const sharedVideos = (state = [], action) => {
    switch (action.type) {
        case 'SET_SHARED_VIDEOS':
            return action.payload;
        default:
            return state;
    }
};
// share object (selected connection IDs and video ID) will be on the redux state at:
// state.shareReducer
export default combineReducers({
    shareReducer,
    sharedVideos
  });
