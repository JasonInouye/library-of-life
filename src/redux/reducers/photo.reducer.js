const photoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_PHOTO':
            return action.payload;
        case 'CLEAR_PHOTO':
            return [];
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.videoReducer
export default photoReducer;