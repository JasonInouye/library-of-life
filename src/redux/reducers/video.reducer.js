const videoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_VIDEOS':
            return action.payload;
        case 'SET_SINGLE_VIDEO':
            return action.payload[0];
        case 'CLEAR_VIDEO':
            return [];
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.videoReducer
export default videoReducer;
