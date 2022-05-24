const videoModalReducer = (state = [], action) => {
    console.log('this is the modal payload', action.payload);
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