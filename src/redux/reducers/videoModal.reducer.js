const videoModalReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MODAL_VIDEO':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.videoReducer
export default videoModalReducer;