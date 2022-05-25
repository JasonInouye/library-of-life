const shareReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SHARE_REDUCER':
            return action.payload;
        case 'CLEAR_SHARE_REDUCER':
            return state;
        default:
            return state;
    }
    console.log('in shareReducer, data is', action.payload);

};

// share object (selected connection IDs and video ID) will be on the redux state at:
// state.shareReducer
export default shareReducer;
